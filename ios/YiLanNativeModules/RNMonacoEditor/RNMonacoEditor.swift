//  Created by react-native-create-bridge

import UIKit
import WebKit

class RNMonacoEditor : UIView, WKUIDelegate, WKNavigationDelegate {
  let WebViewMessagePageReady = "pageReady"
  let WebViewMessageEditorReady = "editorReady"
  
  var webView: WKWebView!
  var editorReady: Bool = false;
  
  var propValue: String = ""
  var propLanguage: String = ""
  var propReadOnly: Bool = false
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    guard let mainResourceURL = Bundle.main.resourceURL else {
      return
    }
    
    let monacoEditorPath = "YiLanAssets/monaco-editor/"
    
    let sourceURL = mainResourceURL.appendingPathComponent("\(monacoEditorPath)/index.html");
    let readAccessURL = mainResourceURL.appendingPathComponent(monacoEditorPath);
    
    self.webView = WKWebView(frame: frame)
    self.webView.configuration.userContentController.add(self, name: WebViewMessagePageReady)
    self.webView.configuration.userContentController.add(self, name: WebViewMessageEditorReady)
    self.webView.scrollView.bounces = false
    self.webView.uiDelegate = self
    self.webView.navigationDelegate = self
    self.webView.loadFileURL(sourceURL, allowingReadAccessTo: readAccessURL)

    self.addSubview(webView)
  }

  required init?(coder aDecoder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
  }
  
  override func layoutSubviews() {
    super.layoutSubviews();
    self.webView.frame = self.bounds;
    
    let javaScriptString = "window.editor.layout();"
    
    NSLog(javaScriptString)
    self.webView.evaluateJavaScript(javaScriptString, completionHandler: nil)
  }
  
  func setValue(_ value: NSString) {
    let originalString = NSMutableString(string: value)
    let newString = originalString.replacingOccurrences(of: "\\", with: "\\\\", options: NSString.CompareOptions.literal, range: NSRange())
    
    self.propValue = newString as String
  }
  
  func setLanguage(_ language: NSString) {
    self.propLanguage = language as String
  }
  
  func setReadOnly(_ readOnly: Bool) {
    self.propReadOnly = readOnly
  }
}

extension RNMonacoEditor: WKScriptMessageHandler {
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == WebViewMessagePageReady {
      do {
        var javaScriptString = ""
        javaScriptString += "window.editorOptions.value = " + self.propValue + ";\n"
        javaScriptString += "window.editorOptions.language = \"" + self.propLanguage + "\";\n"
        javaScriptString += "window.editorOptions.readOnly = " + (self.propReadOnly ? "true" : "false") + ";\n"
        javaScriptString += "window.editorRenewIfNeed();"
        
//        try NSLog(javaScriptString)
        try self.webView.evaluateJavaScript(javaScriptString, completionHandler: nil)
      } catch {
        print(error)
      }
    }
    if message.name == WebViewMessageEditorReady {
//      let javaScriptString = """
//        window.editor.setValue(\(self.propValue!));
//      """
//      self.webView.evaluateJavaScript(javaScriptString, completionHandler: nil)
    }
  }
  
  
}
