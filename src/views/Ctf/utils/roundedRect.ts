import { Shape } from 'three'

export function roundedRect( shape: Shape, x:number, y:number, width:number, height:number, radius:number ) {
  shape.moveTo( x, y + radius );
  shape.lineTo( x, y + height - radius );
  shape.quadraticCurveTo( x, y + height, x + radius, y + height );
  shape.lineTo( x + width - radius, y + height) ;
  shape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  shape.lineTo( x + width, y + radius );
  shape.quadraticCurveTo( x + width, y, x + width - radius, y );
  shape.lineTo( x + radius, y );
  shape.quadraticCurveTo( x, y, x, y + radius );
  return shape
}