@objc(RNPreviewExtension)
class RNPreviewExtension : NSObject {
  static var extensionContext: NSExtensionContext?

  // Export constants to use in your native module
  func constantsToExport() -> [String : Any]! {
    return ["EXAMPLE_CONSTANT": "example"]
  }

  // Implement methods that you want to export to the native module
  @objc func completeRequest() {
    if RNPreviewExtension.extensionContext === nil {
      return
    }

    let extensionContext = RNPreviewExtension.extensionContext;
    extensionContext!.completeRequest(returningItems: extensionContext!.inputItems, completionHandler: nil)
    RNPreviewExtension.extensionContext = nil
  }
}
