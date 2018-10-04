import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Issue} from "../../issue.model";
import { IssueService } from '../../issue.service';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  filteredIssues: Issue[];
  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        this.filteredIssues = [...this.issues];
        console.log('Data requested ...');
        console.log(this.issues);
      });
  }

  applyFilterTitle(value: string) {
    this.filteredIssues = this.issues.filter((issue) => {
      return issue.title.toLowerCase().includes(value.toLowerCase());
    })
  }

  applyFilterResponsible(value: string) {
    this.filteredIssues = this.issues.filter((issue) => {
       return issue.responsible.toLowerCase().includes(value.toLowerCase());
    })
  }

  applyFilterSeverity(value: string) {
    this.filteredIssues = this.issues.filter((issue) => {
      return issue.severity.toLowerCase().includes(value.toLowerCase());
    })
  }

  applyFilterStatus(value: string) {
    this.filteredIssues = this.issues.filter((issue) => {
      return issue.status.toLowerCase().includes(value.toLowerCase());
    })
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.issueService.deleteIssue(id).subscribe(() => {
          this.fetchIssues();
        });
      }
    });
  }
}
