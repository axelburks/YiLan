import UIKit
import MobileCoreServices
import SVProgressHUD

class ActionViewController: UIViewController, UIViewControllerTransitioningDelegate {
  @IBOutlet weak var imageView: UIImageView!

  var reactNativeRootView: RCTRootView?

  override func viewDidLoad() {
    super.viewDidLoad()
    for item in self.extensionContext!.inputItems as! [NSExtensionItem] {
      for provider in item.attachments! as! [NSItemProvider] {
        let typeIdentifier: String = provider.registeredTypeIdentifiers.first as! String
        provider.loadItem(forTypeIdentifier: typeIdentifier, options: nil, completionHandler: { (result, error) in
          self.writeYilanPreviewData(typeIdentifier, result: result)
        })
      }
    }

    let jsCodeLocation: URL;
    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)

    let rootView = RCTRootView.init(
      bundleURL: jsCodeLocation,
      moduleName: "YiLan",
      initialProperties: nil,
      launchOptions: nil
    )
    rootView?.backgroundColor = UIColor.init(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
    rootView?.frame = self.view.frame

    self.view.addSubview(rootView!)
    self.reactNativeRootView = rootView

    SVProgressHUD.setViewForExtension(self.view)
    RNPreviewExtension.extensionContext = self.extensionContext
  }

  override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
    self.reactNativeRootView?.removeFromSuperview()
    self.reactNativeRootView?.bridge.invalidate()
    self.reactNativeRootView?.invalidateIntrinsicContentSize()
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }

  func screenSnapshot() -> UIImage? {
    UIGraphicsBeginImageContextWithOptions(self.view.bounds.size, false, UIScreen.main.scale)

    self.view.drawHierarchy(in: self.view.bounds, afterScreenUpdates: true)

    let image = UIGraphicsGetImageFromCurrentImageContext()!
    UIGraphicsEndImageContext()

    let ciImage: CIImage = CIImage(image: image)!

    let detector = CIDetector(ofType: CIDetectorTypeQRCode, context:nil,options:[CIDetectorAccuracy:CIDetectorAccuracyHigh])

    let features = detector?.features(in: ciImage)
    for feature in features as! [CIQRCodeFeature] {
      print(feature.messageString ?? "")
    }

    return image
  }

  func writeYilanPreviewData(_ typeIdentifier: String, result: NSSecureCoding?) {
    guard let directoryUrl = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.me.thecode.yilanapp") else { return }

    var previewData: [String: Any] = [:]
    var dataType: String = "unknown"
    var dataContent: String = "";

    do {
      if typeIdentifier.isEqual(kUTTypeURL as String) {
        dataType = "url"
        dataContent = (result as! NSURL).absoluteString!
      } else {
        let fileManager = FileManager.default;

        if let fileURL = result as? NSURL {
          let dir = "\(directoryUrl.path)/files/"

          if (!fileManager.fileExists(atPath: "\(directoryUrl.path)/files")) {
            try fileManager.createDirectory(atPath: dir, withIntermediateDirectories: true, attributes: nil)
          }

          let fileName: String = fileURL.lastPathComponent!
          let filePath: String = "\(dir)\(UUID().uuidString).\(fileURL.pathExtension!)";

          if (fileManager.fileExists(atPath: filePath)) {
            try fileManager.removeItem(atPath: filePath)
          }
          try fileManager.copyItem(atPath: fileURL.path!, toPath: filePath)

          dataType = "file"
          dataContent = fileName
          previewData.updateValue(fileName, forKey: "extraFileName")
          previewData.updateValue(filePath, forKey: "extraFilePath")
        } else {
          dataType = "text";
          dataContent = result as! String
        }
      }

      previewData.updateValue(dataType, forKey: "type")
      previewData.updateValue(dataContent, forKey: "content")

      let jsonData = try? JSONSerialization.data(withJSONObject: previewData, options: [])
      let jsonString = String(data: jsonData!, encoding: String.Encoding.utf8)!

      NSLog(jsonString)

      let yilanPreviewDataFileUrl = directoryUrl.appendingPathComponent("yilanPreviewData.json")
      if (FileManager.default.fileExists(atPath: yilanPreviewDataFileUrl.path)) {
        try FileManager.default.removeItem(atPath: yilanPreviewDataFileUrl.path)
      }
      try jsonData?.write(to: yilanPreviewDataFileUrl, options: [])
    } catch {
      print(error)
    }
  }

  @IBAction func done() {
    // Return any edited content to the host app.
    // This template doesn't do anything, so we just echo the passed in items.
    self.extensionContext!.completeRequest(returningItems: self.extensionContext!.inputItems, completionHandler: nil)
  }
}

