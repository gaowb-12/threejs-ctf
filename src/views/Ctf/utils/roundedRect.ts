import { Shape } from 'three'

// 创建一个圆角长方形
export function roundedRect( shape: Shape, x:number, y:number, width:number, height:number, radius:number ) {
  // 起点
  shape.moveTo( x, y + radius );
  // 画直线
  shape.lineTo( x, y + height - radius );
  // 画圆角
  // 从.currentPoint创建一条二次曲线，以第一个第二个参数(cpX,cpY)作为控制点，并将.currentPoint更新到第三第四个参数。
  shape.quadraticCurveTo( x, y + height, x + radius, y + height );

  shape.lineTo( x + width - radius, y + height) ;
  shape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );

  shape.lineTo( x + width, y + radius );
  shape.quadraticCurveTo( x + width, y, x + width - radius, y );

  shape.lineTo( x + radius, y );
  shape.quadraticCurveTo( x, y, x, y + radius );
  return shape
}