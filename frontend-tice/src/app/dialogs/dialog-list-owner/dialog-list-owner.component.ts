import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-list-owner',
  templateUrl: './dialog-list-owner.component.html',
  styleUrls: ['./dialog-list-owner.component.css']
})
export class DialogListOwnerComponent implements OnInit {
  @Output() dataSend = new EventEmitter<any>();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogListOwnerComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getInfo(item:any){
    this.dataSend.emit(item);
    this.dialogRef.close();
  }

}
