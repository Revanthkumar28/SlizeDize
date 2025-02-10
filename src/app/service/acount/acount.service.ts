import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject ,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcountService {
  subs : Subject<string>;

  constructor() {
    this.subs= new Subject<string>();

   }
   sendName(data:any){
    this.subs.next(data)
   }

   public countryFlagArray:any[]=[
    {"name":"United States","code":"US","emoji":"🇺🇸","phcode":"+1","unicode":"U+1F1FA U+1F1F8","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg"},  
    {"name":"India","code":"IN","phcode":"+91","emoji":"🇮🇳","unicode":"U+1F1EE U+1F1F3","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg"},
    {"name":"Ascension Island","code":"AC","phcode":"+247","emoji":"🇦🇨","unicode":"U+1F1E6 U+1F1E8","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg",},
    {"name":"Greenland","code":"GL","phcode":"+299","emoji":"🇬🇱","unicode":"U+1F1EC U+1F1F1","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg"},
    {"name":"Gambia","code":"GM","phcode":"+220","emoji":"🇬🇲","unicode":"U+1F1EC U+1F1F2","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg"},
    {"name":"Guinea","code":"GN","phcode":"+224","emoji":"🇬🇳","unicode":"U+1F1EC U+1F1F3","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg"},
    {"name":"Benin","code":"BJ","phcode":"+229","emoji":"🇧🇯","unicode":"U+1F1E7 U+1F1EF","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg"},
    {"name":"American Samoa","code":"AS","phcode":"+1","emoji":"🇦🇸","unicode":"U+1F1E6 U+1F1F8","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg"},
    {"name":"Andorra","code":"AD","emoji":"🇦🇩","phcode":"+376","unicode":"U+1F1E6 U+1F1E9","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg"},
    {"name":"United Arab Emirates","phcode":"+971","code":"AE","emoji":"🇦🇪","unicode":"U+1F1E6 U+1F1EA","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg"},
    {"name":"Afghanistan","code":"AF","emoji":"🇦🇫","phcode":"+93","unicode":"U+1F1E6 U+1F1EB","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg"},
    {"name":"Antigua & Barbuda","code":"AG","phcode":"+1","emoji":"🇦🇬","unicode":"U+1F1E6 U+1F1EC","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg"},
    {"name":"Anguilla","code":"AI","phcode":"+1","emoji":"🇦🇮","unicode":"U+1F1E6 U+1F1EE","image":"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg"}

  ];
}
