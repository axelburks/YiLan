import UIKit
import SVProgressHUD

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
    // Dev AppId
    Bugly.start(withAppId: "41a77f3226")

    let jsCodeLocation: URL;

    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)

    let rootView: RCTRootView = RCTRootView.init(
      bundleURL: jsCodeLocation,
      moduleName: "YiLan",
      initialProperties: nil,
      launchOptions: launchOptions
    )
    rootView.backgroundColor = UIColor.init(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)

    self.window = UIWindow.init(frame: UIScreen.main.bounds)
    let rootViewController: UIViewController = UIViewController()
    rootViewController.view = rootView
    self.window!.rootViewController = rootViewController
    self.window!.makeKeyAndVisible()

    SVProgressHUD.setViewForExtension(self.window!)
    RNSplashScreen.show()
    return true
  }

  func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    return RCTLinkingManager.application(app, open: url, options: options)
  }
}
