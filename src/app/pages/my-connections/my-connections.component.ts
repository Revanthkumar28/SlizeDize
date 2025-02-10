import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { NgToastService } from 'ng-angular-popup';

interface User {
  key: number;
  name: string;
  title: string;
  parent?: number;
  image?: string;
}

interface TreeNode {
  key: number;
  name: string;
  title: string;
  image?: string;
  children?: TreeNode[];
}

@Component({
  selector: 'b2b-my-connections',
  templateUrl: './my-connections.component.html',
  styleUrls: ['./my-connections.component.css']
})

export class MyConnectionsComponent implements OnInit {
  username: any = '';
  userboss: any = '';
  userId:any ='';
  usertitle:any='';
  userdesignation:any=[]
  hotel_name: any = '';
  userID: any = '';
  adjustwidth: any = '';
  Width: any = '90vw'
  hotels: any[] = [];
  openuser: boolean = false;
  userlist: User[] = [
    { 'key': 1, 'name': 'Stella Payne Diaz', 'title': 'CEO', 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 2, 'name': 'Luke Warm', 'title': 'VP Marketing/Sales', 'parent': 1, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 3, 'name': 'Meg Meehan Hoffa', 'title': 'Sales', 'parent': 2, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 4, 'name': 'Peggy Flaming', 'title': 'VP Engineering', 'parent': 1, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 5, 'name': 'Saul Wellingood', 'title': 'Manufacturing', 'parent': 4, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 6, 'name': 'Al Ligori', 'title': 'Marketing', 'parent': 2, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 7, 'name': 'Dot Stubadd', 'title': 'Sales Rep', 'parent': 3, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 8, 'name': 'Les Ismore', 'title': 'Project Mgr', 'parent': 5, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 9, 'name': 'April Lynn Parris', 'title': 'Events Mgr', 'parent': 6, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 10, 'name': 'Xavier Breath', 'title': 'Engineering', 'parent': 4, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
    { 'key': 11, 'name': 'Anita Hammer', 'title': 'Process', 'parent': 10, 'image': 'https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
  ];
  treeData: TreeNode[] = [];
  @Output() loader = new EventEmitter();

  constructor(
    private router: Router,
    private location: Location,
    private hotelService: HotelService,
    private appserviceService: AppserviceService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.treeData = this.buildTree(this.userlist);
    this.appserviceService.user_ID$.subscribe(datas => {
      this.userID = datas;
      const obj = { user_id: this.userID };
      this.hotelService.hotel_for_user(obj).subscribe((res: any) => {
        this.loader.emit(true)
        this.hotels = res.hotel.map((element: any) => ({
          Hotel_Name_id: element.Hotel_Name_id,
          Hotel_Name: element.Hotel_Name
        }));
      });
    });

  }

  buildTree(userlist: User[]): TreeNode[] {
    const tree: { [key: number]: TreeNode } = {};
    const roots: TreeNode[] = [];

    // Initialize tree nodes and index by key
    // User cant add 1 roles
    userlist.forEach(user => {
      tree[user.key] = { ...user, children: [] };
    });
    console.log(tree)
    // Assign children to their parents
    userlist.forEach(user => {
      if (user.parent !== undefined && tree[user.parent]) {
        tree[user.parent].children!.push(tree[user.key]);
      } else {
        roots.push(tree[user.key]);
      }
    });

    console.log(roots)
    return roots;
  }

  getuser(name: any, Id: any, Boss: any, title='none') {
    this.openuser = true;
    console.log(name);
    console.log(Id);
    console.log(Boss);
    this.username = name;
    this.userboss = Boss;
    this.userID = Id
    this.usertitle = title

    this.userlist.forEach((ord:any)=>{
      this.userdesignation.push(ord.title)
    })
   
  }
  submituser(){
    this.openuser = false
    this.userlist.forEach((element:any)=>{
      if(element.key == this.userID){
        element.parent = this.userboss
        element.name = this.username
        element.title = this.usertitle
      }
    })
    console.log(this.userlist)
    this.treeData = this.buildTree(this.userlist);

  }

  getInput(hotelName: any, hotelID: any) {
    this.hotel_name = hotelName;
    this.myconnection(hotelID);
  }

  myconnection(hotelid: any) {
    const obj = { Hotel_Name_id: hotelid };
    this.hotelService.reporting_for_hotel(obj).subscribe({
      next: (res) => {

        this.userlist = [
          {
            'key': res.reporting_users[0].user_id,
            'name': res.reporting_users[0].user_name,
            'title': 'Admin',
            'parent': 0,
            'image': res.reporting_users[0].profile != null &&  res.reporting_users[0].profile != "" ? res.reporting_users[0].profile:'https://th.bing.com/th?id=OIP.LftRMxkISZ37h5xsxfDCWQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
          }

        ];

        res.reporting_users.forEach((reporting: any) => {
          reporting.employee.forEach((emp: any) => {
            this.userlist.push({
              'key': emp.user_id,
              'name': emp.emp_name,
              'title': emp.Designation_Name,
              'parent': reporting.user_id,
              'image': emp.profile != null && emp.profile != "" ? emp.profile : 'https://th.bing.com/th?id=OIP.LftRMxkISZ37h5xsxfDCWQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
            })

          });
        });

        console.log(this.userlist)

        if (this.userlist.length > 10 && this.userlist.length < 50) {
          this.Width = '150vw'
        }
        if (this.userlist.length > 50) {
          this.Width = '250vw'
        }
        if (this.Width) {
          this.adjustwidth += "width :" + this.Width + ";";
        }
        this.treeData = this.buildTree(this.userlist);

      },
      error: (error) => {
        this.toast.error({ detail: "ERROR", summary: 'No report found for this hotel', duration: 5000 });
      }
    });
  }

  
}
