import { Injectable } from "@angular/core";
/**
 * DateUtils Injectable
 */
@Injectable()
export class DateUtils {
    // current selected date
    selectedDate: Date = null;
    
   /**
    * time string to Date
    * time string format - HH:mm
    * @param time 
    */
  timeToDate(time: string, selectedDate?: Date): Date {
    let date = selectedDate || new Date();
    let parts = time.split(/:/);

    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10); 
      
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }
}