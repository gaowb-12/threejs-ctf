
// 记录时间
class Timing{
    startTime: number;
    during: number;
    iterations: number;
    easing: (p: number)=> number;
    constructor({during = 1000, iterations = 1, easing = (p:number)=>p}){
        this.startTime = Date.now();
        this.during = during;
        this.iterations = iterations;
        this.easing = easing;
    }
    get time(){
        return Date.now() - this.startTime;
    }
    get p(){
        let progress = Math.min(this.time / this.during, this.iterations);
        return this.isFinished ? 1 : this.easing(progress % 1);
    }
    get isFinished(){
        return this.time / this.during >= this.iterations;
    }
}

// 标准动画模型
export class Animator{
    timing: any;
    constructor({during = 1000, iterations = 1, easing = (p:number)=>p}){
        this.timing = { during, iterations, easing };
    }
    // 执行动画
    animate(target: any, update: (obj:any)=>any){
        // 创建时间对象
        let timing = new Timing(this.timing);
        // 创建异步执行函数
        return new Promise((resolve)=>{
            let next = () => {
                if(update({target, timing}) !== false && !timing.isFinished){
                    // 动画执行中，调用更新函数
                    requestAnimationFrame(next);
                }else{
                    // 动画执行完成，结束调用
                    resolve(timing)
                }
            }
            next()
        });
    }
}