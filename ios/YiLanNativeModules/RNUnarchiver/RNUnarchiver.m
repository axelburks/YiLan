#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNUnarchiver, NSObject)

RCT_EXTERN_METHOD(unarchive: (NSString *)
                  targetPath: (NSString *)
                  resolve:(RCTPromiseResolveBlock *)
                  reject:(RCTPromiseRejectBlock *))

@end
