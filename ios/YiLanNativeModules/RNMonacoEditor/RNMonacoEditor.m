#if __has_include(<React/RCTViewManager.h>)
#import <React/RCTViewManager.h>
#elif __has_include(“RCTViewManager.h”)
#import “RCTViewManager.h”
#else
#import “React/RCTViewManager.h”
#endif

@interface RCT_EXTERN_MODULE(RNMonacoEditorManager, RCTViewManager)

//- (instancetype)init
//{
//  return [self initWithRedirectDelegate:nil];
//}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_VIEW_PROPERTY(value, NSString)
RCT_EXPORT_VIEW_PROPERTY(language, NSString)
RCT_EXPORT_VIEW_PROPERTY(readOnly, BOOL)

@end
