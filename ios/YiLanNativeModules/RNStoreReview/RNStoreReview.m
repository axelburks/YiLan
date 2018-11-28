#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNStoreReview, NSObject)

//- (instancetype)init
//{
//  return [self initWithRedirectDelegate:nil];
//}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXTERN_METHOD(requestReview)

@end
