#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNUnarchiver, NSObject)

//- (instancetype)init
//{
//  return [self initWithRedirectDelegate:nil];
//}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}


RCT_EXTERN_METHOD(unarchive: (NSString *)
                  targetPath: (NSString *)
                  password: (NSString *)
                  resolve:(RCTPromiseResolveBlock *)
                  reject:(RCTPromiseRejectBlock *))

@end
