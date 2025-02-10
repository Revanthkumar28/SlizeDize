import { Component, OnInit,Input } from '@angular/core';

interface countryFlag{
  name:string;
  code:any;
  image:string;
  emoji:string;
  unicode:string;
  phcode:any;
}

@Component({
  selector: 'b2b-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {
  @Input() Option: boolean = true;
  @Input() flagStyle:string='';
  @Input() width:string='';
  @Input() value:string= '';
  @Input() inputType:string= '';
  @Input() backgroundTheme:string= '';
  @Input() test:any=''

  mobileNumber:(number)[]=[9994388702,9345763];
  public countryFlagArray:countryFlag[]=[
  
    {"name":"India","code":"IN","phcode":"+91","emoji":"🇮🇳","unicode":"U+1F1EE U+1F1F3","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg"},

    {"name":"Ascension Island",
    "code":"AC",
    "phcode":"+247",
    "emoji":"🇦🇨",
    "unicode":"U+1F1E6 U+1F1E8",
    "image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg",
  },
  {"name":"Greenland","code":"GL","phcode":"+299","emoji":"🇬🇱","unicode":"U+1F1EC U+1F1F1","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg"},
  {"name":"Gambia","code":"GM","phcode":"+224","emoji":"🇬🇲","unicode":"U+1F1EC U+1F1F2","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg"},
  {"name":"Guinea","code":"GN","phcode":"+91","emoji":"🇬🇳","unicode":"U+1F1EC U+1F1F3","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg"},
  {"name":"Benin","code":"BJ","phcode":"+229","emoji":"🇧🇯","unicode":"U+1F1E7 U+1F1EF","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg"},
  

  ];
  
  constructor() { }

  ngOnInit(): void {
    if(this.width) {
      this.flagStyle += "width: " + this.width + ";";
    }
    if(this.backgroundTheme) {
      this.flagStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
  }
  // flag= this.countryFlagArray;
  flagArr:any='';

  getflag(data :any){
    this.flagArr=data;
    console.log(data)
    this.Option=false;
    this.test=this.flagArr['phcode']
  }

   
}
