import UnrarKit
import LzmaSDK_ObjC
import SSZipArchive

@objc(RNUnarchiver)
class RNUnarchiver : NSObject {
  var sourcePath: String = ""
  var targetPath: String = ""

  // Export constants to use in your native module
  func constantsToExport() -> [String : Any]! {
    return ["EXAMPLE_CONSTANT": "example"]
  }
  
  @objc func unarchive(_ sourcePath: NSString,
                       _ targetPath: NSString,
                       _ resolve: @escaping RCTPromiseResolveBlock,
                       _ reject: @escaping RCTPromiseRejectBlock) {
    self.sourcePath = sourcePath as String
    self.targetPath = targetPath as String
    var decompressed: Bool = false;
    
    if sourcePath.hasSuffix(".rar") {
      decompressed = self.decompressRar()
    } else if sourcePath.hasSuffix("zip") {
      decompressed = self.decompressZip()
    } else if sourcePath.hasSuffix(".7z") {
      decompressed = self.decompress7z()
    }

    if (decompressed) {
      resolve(targetPath)
    } else {
      reject("-1", "Unarchive failed", nil)
    }
    self.sourcePath = ""
    self.targetPath = ""
  }
  
  func decompressRar() -> Bool {
    do {
      let archive: URKArchive = try URKArchive.init(path: self.sourcePath)
      try archive.extractFiles(to: self.targetPath, overwrite: true)
    } catch {
      return false
    }
    return true
  }
  
  func decompressZip() -> Bool {
    return SSZipArchive.unzipFile(atPath: self.sourcePath, toDestination: self.targetPath)
  }
  
  func decompress7z() -> Bool {
    let reader = LzmaSDKObjCReader(fileURL: URL(fileURLWithPath: self.sourcePath), andType: LzmaSDKObjCFileType7z)
    do {
      try reader.open()
    } catch let error as NSError {
      print("Can't open archive: \(error.localizedDescription) ")
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
