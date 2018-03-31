import StoreKit

@objc(RNStoreReview)
class RNStoreReview : NSObject {
  // Export constants to use in your native module
  func constantsToExport() -> [String : Any]! {
    return ["EXAMPLE_CONSTANT": "example"]
  }

  // Implement methods that you want to export to the native module
  @objc func requestReview() {
    if #available(iOS 10.3, *) {
      SKStoreReviewController.requestReview()
    } else {
      // Fallback on earlier versions
    }
  }
}
