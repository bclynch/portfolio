import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-project-dialogue',
  templateUrl: './project-dialogue.component.html',
  styleUrls: ['./project-dialogue.component.scss']
})
export class ProjectDialogueComponent implements OnInit {

  faGithub = faGithub;

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
