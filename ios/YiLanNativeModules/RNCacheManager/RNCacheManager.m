//
//  Orientation.m
//

#import "RNCacheManager.h"
#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#else
#import "RCTEventDispatcher.h"
#endif
#import <SDWebImage/SDImageCache.h>

@implementation RNCacheManager
@synthesize bridge = _bridge;

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getCacheSize:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *cacheSizeStr = @"0.0MB";
  CGFloat sizeLength = (CGFloat)[[SDImageCache sharedImageCache] getSize]/1024/1024;
  if (sizeLength > 0) {
    cacheSizeStr = [NSString stringWithFormat:@"%.2f MB",sizeLength];
  }
  resolve(cacheSizeStr);
}

RCT_EXPORT_METHOD(clear:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[SDImageCache sharedImageCache] clearDiskOnCompletion:^{
    resolve(@"0.0MB");
  }];
}

- (NSDictionary *)constantsToExport
{
  return @{
  };
}

@end
