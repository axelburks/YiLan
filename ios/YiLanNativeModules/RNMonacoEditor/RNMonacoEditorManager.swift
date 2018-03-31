import UIKit

@objc(RNMonacoEditorManager)
class RNMonacoEditorManager : RCTViewManager {
  // Return the native view that represents your React component
  override func view() -> UIView! {
    return RNMonacoEditor()
  }
}
