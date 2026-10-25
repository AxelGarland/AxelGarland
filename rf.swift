import AVFoundation
import AppKit
let a = AVAsset(url: URL(fileURLWithPath: "/Users/axelgarland/Axel Garland portfolio/public/pictures/kindred/showreel.mp4"))
let d = CMTimeGetSeconds(a.duration); print("dur", d)
let g = AVAssetImageGenerator(asset: a); g.requestedTimeToleranceBefore = .zero; g.requestedTimeToleranceAfter = .zero
let times: [Double] = [0.5, 3, 10, 20, d-6, d-3, d-1.5, d-0.3]
var imgs: [CGImage] = []
for t in times { if let im = try? g.copyCGImage(at: CMTime(seconds: max(0,t), preferredTimescale: 600), actualTime: nil) { imgs.append(im) } }
let w = 320, h = 180
let ctx = CGContext(data: nil, width: w*4, height: h*2, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
for (i, im) in imgs.enumerated() { ctx.draw(im, in: CGRect(x: (i%4)*w, y: h - (i/4)*h, width: w, height: h)) }
try! NSBitmapImageRep(cgImage: ctx.makeImage()!).representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "rf_sheet.png"))
