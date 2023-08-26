import { Component, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent  {
  @Input() title:string = 'Sin nombre';
  @Input() valor:string = 'Sin Valor';

  //@Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label2'];
  @Input('data') barChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  //para la captura
  barChartData2: MultiDataSet = [
    [20, 35, 33],
  ];
  
  @Input('labels') barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo'];

  //gestion:any = new Date().getFullYear();

  public barChartOptions:any = {
   scaleShowVerticalLines:false,
   responsive:true
  };
  
  public barChartType: string = 'bar';
  public barChartLegend:boolean=false;

  //public barChartData:any[] = [
  //  {data:this.data, label:this.header}
  //];

  //events
  public chartClicked(e:any):void{
    console.log(e);
  }

  public chartHovered(e:any):void{
    console.log(e);
  }


}
