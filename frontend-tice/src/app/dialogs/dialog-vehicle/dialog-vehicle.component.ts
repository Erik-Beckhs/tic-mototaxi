import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.css']
})
export class DialogVehicleComponent implements OnInit {
  @Output() dataSend = new EventEmitter<any>();
  
  parentId:number;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVehicleComponent>,
  ) { 
    this.parentId = data.id
  }

  ngOnInit(): void {

  }

  closeDialog(){
    this.dialogRef.close();
  }

  getInfo(item:any){
    //hacer emit
    this.dataSend.emit(item);
    this.dialogRef.close();
  }
}
