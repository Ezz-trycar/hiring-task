import { UseInterceptors , NestInterceptor ,ExecutionContext , CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { userDto } from "src/user/dto/user.dto";


export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
       // console.log('running before context')

        return next
        .handle()
        .pipe(
          map((data) =>{
            //console.log("before response is sent away" +JSON.stringify(data))
            return plainToClass(userDto,data , {
                excludeExtraneousValues:true
            })}
          )
        );
    }
}
