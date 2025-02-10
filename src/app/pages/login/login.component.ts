import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'b2b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('moveUp', [
      transition("void => *", [
        animate('0.2s', keyframes([
          style({transform: "translate(0, 20px)", opacity: 0}),
          style({transform: "translate(0, 0px)", opacity: 1})
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  type: string = "sign-in";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let nav = params.get("type");
      if(nav) {
        this.type = nav;
        console.log(this.type);
      }
    });
    localStorage.removeItem("hotels_room");
  }
}
