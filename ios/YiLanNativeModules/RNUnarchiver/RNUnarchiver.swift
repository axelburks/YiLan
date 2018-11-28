import UnrarKit
import LzmaSDK_ObjC
import SSZipArchive

@objc(RNUnarchiver)
class RNUnarchiver : NSObject {
  var sourcePath: String = "";
  var targetPath: String = "";
  var archivePassword: String = "";
  var archiveEncrypted: Bool = false;
  var archiveDecompressed: Bool = false;

//  // Export constants to use in your native module
//  func constantsToExport() -> [String : Any]! {
//    return ["EXAMPLE_CONSTANT": "example"]
//  }
  
  @objc func unarchive(_ sourcePath: NSString,
                       _ targetPath: NSString,
                       _ password: NSString,
                       _ resolve: @escaping RCTPromiseResolveBlock,
                       _ reject: @escaping RCTPromiseRejectBlock) {
    self.sourcePath = sourcePath as String
    self.targetPath = targetPath as String
    self.archivePassword = password as String;
    
    if sourcePath.hasSuffix(".rar") {
      self.archiveDecompressed = self.decompressRar()
    } else if sourcePath.hasSuffix("zip") {
      self.archiveDecompressed = self.decompressZip()
    } else if sourcePath.hasSuffix(".7z") {
      self.archiveDecompressed = self.decompress7z()
    }

    if (self.archiveDecompressed) {
      resolve(targetPath)
    } else if (self.archivePassword.isEmpty && self.archiveEncrypted) {
      reject("99", "Archive is encrypted! Please provide a password for the archived file.", nil);
    } else {
      reject("-1", "Unarchive failed", nil)
    }

    self.sourcePath = ""
    self.targetPath = ""
    self.archivePassword = "";
    self.archiveEncrypted = false;
    self.archiveDecompressed = false;
  }
  
  func decompressRar() -> Bool {
    do {
      let archive: URKArchive = try URKArchive.init(path: self.sourcePath)
      if (archive.isPasswordProtected()) {
        self.archiveEncrypted = true;
        if (self.archivePassword.isEmpty) {
          return false;
        }
        archive.password = self.archivePassword;
      }

      try archive.extractFiles(to: self.targetPath, overwrite: true)
    } catch {
      return false
    }
    return true
  }
  
  func decompressZip() -> Bool {
    if (SSZipArchive.isFilePasswordProtected(atPath: self.sourcePath)) {
      self.archiveEncrypted = true;
      
      if (self.archivePassword.isEmpty) {
        return false;
      }
    }
    
    let success: Bool = SSZipArchive.unzipFile(atPath: self.sourcePath,
                                               toDestination: self.targetPath,
                                               preserveAttributes: true,
                                               overwrite: true,
                                               nestedZipLevel: 1,
                                               password: self.archivePassword.isEmpty == false ? self.archivePassword : nil,
                                               error: nil,
                                               delegate: nil,
                                               progressHandler: nil,
                                               completionHandler: nil)

    return success;
  }
  
  func decompress7z() -> Bool {
    let reader = LzmaSDKObjCReader(fileURL: URL(fileURLWithPath: self.sourcePath), andType: LzmaSDKObjCFileType7z)
    reader.passwordGetter = { () -> String in
      return self.archivePassword;
    }

    do {
      try reader.open()
    } catch let error as NSError {
      print("Can't open archive: \(error.localizedDescription) ")
      self.archiveEncrypted = true;
      return false;
    }
    
    var items = [LzmaSDKObjCItem]()
    // Iterate all archive items, track what items do you need & hold them in array.
    reader.iterate { (item: LzmaSDKObjCItem?, error: Error?) -> Bool in
      if item != nil {
        items.append(item!)
      }
      return true
    }
    if reader.extract(items, toPath: self.targetPath, withFullPaths: true) {
      if (reader.lastError != nil) {
        print("Extract failed: \(reader.lastError!.localizedDescription)")
      }
      return true;
    }
    return false
  }
}
