import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-dialogue',
  templateUrl: './project-dialogue.component.html',
  styleUrls: ['./project-dialogue.component.scss']
})
export class ProjectDialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: any }
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.dialogRef.close();
  }
}
