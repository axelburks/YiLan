import UIKit
import MobileCoreServices

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
    
    self.view = rootView!
    self.reactNativeRootView = rootView
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
        if let fileURL = result as? NSURL {
          let fileName: String = fileURL.lastPathComponent!
          let filePath: String = directoryUrl.appendingPathComponent("\(UUID().uuidString).\(fileURL.pathExtension!)").path

          if (FileManager.default.fileExists(atPath: filePath)) {
            try FileManager.default.removeItem(atPath: filePath)
          }
          try FileManager.default.copyItem(atPath: fileURL.path!, toPath: filePath)
          
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

