#import "RNProgressHUD.h"
#if __has_include("SVProgressHUD.h")
#import "SVProgressHUD.h"
#else
#import <SVProgressHUD/SVProgressHUD.h>
#endif

@implementation RNProgressHUD

- (instancetype)init
{
    self = [super init];
    if (self) {
        [SVProgressHUD setDefaultStyle: SVProgressHUDStyleDark];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSString *)status)
{
    if ([status length] == 0) {
        [SVProgressHUD show];
    } else {
        [SVProgressHUD showWithStatus: status];
    }
}

RCT_EXPORT_METHOD(showInfo:(NSString *)status)
{
    [SVProgressHUD showInfoWithStatus: status];
}

RCT_EXPORT_METHOD(showSuccess:(NSString *) status)
{
    [SVProgressHUD showSuccessWithStatus: status];
}

RCT_EXPORT_METHOD(showError:(NSString *) status)
{
    [SVProgressHUD showErrorWithStatus: status];
}

RCT_EXPORT_METHOD(showProgress: (CGFloat) progress
                  status:(NSString*) status)
{
    [SVProgressHUD showProgress: progress status: status];
}

RCT_EXPORT_METHOD(dismiss:(NSInteger)delay)
{
    if (delay == 0) {
        [SVProgressHUD dismiss];
    } else {
        NSTimeInterval delaySecond = delay / 1000;
        [SVProgressHUD dismissWithDelay: delaySecond];
    }
}

@end
