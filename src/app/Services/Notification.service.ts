import { Injectable } from '@angular/core';
//import { Notiflix} from 'notiflix'
import { map } from 'rxjs/operators';
import * as Notiflix from 'notiflix';


@Injectable()
export class NotificationService{

	
    public MessageString ='';
    

    public Success(MessageString: string){
        Notiflix.Notify.Success(MessageString);
    }

    public Failure(MessageString: string){
        Notiflix.Notify.Failure(MessageString);
    }

    public Warning(MessageString: string){
        Notiflix.Notify.Warning(MessageString);
    }

    public Info(MessageString: string){
        Notiflix.Notify.Info(MessageString);
    }

    public Error(Message: any){       
        var errorDetails = this.getErrorDetails(Message);
        var message = "Unable to process the request. " + Message.message;
        if(errorDetails == undefined || errorDetails == null) Notiflix.Notify.Failure(message);
        else Notiflix.Notify.Failure(errorDetails);
    }

    public LoadingWithMessage(message: string){
        Notiflix.Loading.Standard(message);
    }

    public Loading(){
        Notiflix.Loading.Standard();
    }

    public LoadingHourglass(){
        Notiflix.Loading.Hourglass();
    }

    public LoadingHourglassWithMessage(message: string){
        Notiflix.Loading.Hourglass(message);
    }

    public LoadingCircle(){
        Notiflix.Loading.Circle();
    }

    public LoadingCircleWithMessage(message: string){
        Notiflix.Loading.Circle(message);
    }

    public LoadingArrows(){
        Notiflix.Loading.Arrows();
    }

    public LoadingArrowsWithMessage(message: string){
        Notiflix.Loading.Arrows(message);
    }

    
    public LoadingDots(){
        Notiflix.Loading.Dots();
    }

    public LoadingDotsWithMessage(message: string){
        Notiflix.Loading.Dots(message);
    }

    public Pulse(){
        Notiflix.Loading.Pulse();
    }

    public PulseWithMessage(message: string){
        Notiflix.Loading.Pulse(message);
    }

    public LoadingHourglassChangemessage(message: string){
        Notiflix.Loading.Change(message);
    }

    public LoadingRemove(){
        Notiflix.Loading.Remove();
    }

    private getErrorDetails(ServerError: any): string{
        try
        {
            if(ServerError.error != undefined && ServerError.error != null && ServerError.error.ExceptionMessage != undefined && ServerError.error.ExceptionMessage != null) 
            return ServerError.error.ExceptionMessage;            
        }
        catch{return "";}
    }


}