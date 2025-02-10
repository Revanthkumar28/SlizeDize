import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { ActivatedRoute,Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { NgToastService } from 'ng-angular-popup';
import { elementAt } from 'rxjs';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';
import { DateTime } from 'luxon';

interface countryFlag{
  name:string;
  code:any;
  dial_code:any;
  flag:any;
}

@Component({
  selector: 'b2b-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.css']
})
export class RollsComponent implements OnInit {
  CountryFlag:boolean=true;
  flagArr :any= {};
  catelogTable: string[] = ["SL No" ,"User Name","role","Designation","Department"];
  privilage_Heading: string[] = ["SL No" ,"privilages", "Can Create","Can Read", "Can Edit", "Can Delete"];
  deparment_header :any = ["SL No" ,"Hotel Name","Department"];
  catelogColumnSpacing = "0.2fr 6*1fr";
  selectedRole :any =''
  numberOfHotels :any = []
  userDetails:any = [
    {
      id:1,
      name:'Alex',
      age:'23',
      create:false,
      read:false,
      edit:false,
      delete:false,
      role:['employee','manager']
    },
    {
      id:2,
      name:'saravanan',
      age:'35',
      create:false,
      read:false,
      edit:false,
      delete:false,
      role:['manager']
    }
  ]
  flagFilter:any='';
  HotelName :any = ''
  date_of_joining:any=''
  role_Department_Name:any = ''
  addRoleInput:any = {
    designation_id: '',
    Hotel_Name_id : '',
    role_name : ''
  }

  isDepartment:boolean = true
  isDesignation :boolean = false
  isRoll :boolean = false
  isEmployee :boolean = false
  isAssign :boolean =false
  isPrevilages :boolean = false
  send_date:any=''
  button_name: Record<string, string>[] = [
    {"name": "Department"},
    {"name": "Designation"},
    {"name": "Roles"},
    {"name": "Privileges"}, 
    {"name": "Employees"}, 
    {"name": "Assign"}
  ];

  employeeDetails:any = {
    'name' : '',
    'mobileNumber'  : '',
    'country'  : '',
    'state'  : '',
    'city'  : '',
    'zipCode'  : '',
    'email' : '',

    role_id:'',
    
    'Hotel_Name_id' :'',
    'department_id':'',
    'designation_id' :'',
    'reporting_to' :'',
    'date_of_joining' :'',
    'date_of_termination' :'',
  }

  employee_role :any = {
    'Hotel_Name' : '',
    'Deparment' : '',
    'role' : ''
  }

  privilage_to_role :any = {
    privilage_id : [],
    privilage_name : '',
    role_id : '',
    role_name : '',
    hotel_name : '',

    user_role_name :'',
    user_role_id : '',
    user_name : '',
    user_id : ''
  }

  assign_User_to_role:any = {
    role_name :'',
    role_id : '',
    user_name : '',
    user_id : ''
  }
  flag:any=''

  department_Create :any = {
    Hotel_Name_id : '',
    department_name : ''
  }

  designation_create :any ={
    'Hotel_Name_id':'',
    'department_id' : '',
    'designations_name' : '',
  }
  role_prvilage_heading :any = []
  role_prvilage_Value :any = [
    {
      view : false ,
      create : false,
      edit : false,
      delete: false
    },
    {
      view : false ,
      create : false,
      edit : false,
      delete: false
    },
    {
      view : false ,
      create : false,
      edit : false,
      delete: false
    },
  ]
  list_role_to_privilege:any = []
  filter_hotel_privilages:any = []

  designation_user:any = {
    'Hotel_Name_id' : '', 
    'designation_id' : '', 
    'add_to' : '2', 
    reporting_to :'',
    date_of_joining :'12-May-2024'
  }

  Hotel_deparment_designation :any = [
    {
      Hotel_name : 'Hilton',
      department : [
        {
          id : 1,
          department_name : 'House Keeping',
          designation : [
             {
               id : 1,
               designation_name : 'House keeping manager'
             },
             {
               id : 2,
               designation_name : 'House keeping Employee'
             },
             {
               id : 3,
               designation_name : 'House keeping Director'
             }
          ]
        },
        {
         id : 1,
         department_name : 'Finance',
         designation : [
            {
              id : 1,
              designation_name : 'Finance manager'
            },
            {
              id : 2,
              designation_name : 'Finance Employee'
            },
            {
              id : 3,
              designation_name : 'Finance Director'
            }
         ]
       }
      ]
    },
    {
     Hotel_name : 'GRT chennai ',
     department : [
       {
         id : 1,
         department_name : 'House Keeping',
         designation : [
            {
              id : 1,
              designation_name : 'House keeping manager'
            },
            {
              id : 2,
              designation_name : 'House keeping Employee'
            },
            {
              id : 3,
              designation_name : 'House keeping Director'
            }
         ]
       },
       {
        id : 1,
        department_name : 'Finance',
        designation : [
           {
             id : 1,
             designation_name : 'Finance manager'
           },
           {
             id : 2,
             designation_name : 'Finance Employee'
           },
           {
             id : 3,
             designation_name : 'Finance Director'
           }
        ]
      }
     ]
   }
  ]
  constructor(private router: Router , private route: ActivatedRoute, private location: Location,private AppserviceService:AppserviceService,private HotelService:HotelService,private CountryStateCityService:CountryStateCityService,private toast: NgToastService,private CountryFlagService:CountryFlagService) {}

  typeofRoles :any = []
  accessPrevilages :any = []
  hotelUsers :any = []
  roles_user_table:any = []
  defaultCountryCode:any = '+91'
  exist_role_name :any = ''

  ngOnInit(): void {
    this.dateTime()
    console.log(this.flag)
    // this.route.data.subscribe((datas :any) =>{
    //   // this.numberOfHotels = datas.data.hotel_registrations 
    //   console.log(datas)
    // })
    // COUNTRY NAME
    this.fetchCountry()
    this.list_privilege()

    this.HotelService.getDetails().subscribe((res:any) =>{
      console.log(res)
      this.numberOfHotels = res.hotel_registrations
      this.list_role_user(res.hotel_registrations[0])
      this.privilage_hotel(res.hotel_registrations[0])
    })
    this.flag = this.CountryFlagService.countryFlag
    // USER PRIVILAGES
    this.HotelService.user_privilege().subscribe((res)=>{
      // this.accessPrevilages = res.privilege
    })

    this.all_hotel_department_designation()
    this.list_user_get()
    // LISTED ROLES
    // this.list_role()
  
    // this.list_user()
    // this.department_get()
    // this.list_designation()
  }

  list_All_User:any = []
  list_user_get(){
    this.HotelService.list_user_get().subscribe((res)=>{
      // this.list_All_User = res
      this.list_All_User = res.user_list 
      // this.list_role_user()
      res.admin_user[0].name = res.admin_user[0].name + ' (Admin)'
      this.list_All_User.push(res.admin_user[0])
    })
  }

  list_department_designation_Arr:any = []
  list_department_designation(){
    const payload = {
      Hotel_Name_id : this.employeeDetails.Hotel_Name_id
    }
    this.HotelService.list_department_designation(payload).subscribe((res:any) =>{
      this.list_department_designation_Arr = res.designation_department
    })
  }

  list_privilages :any = []
  list_privilege(){
    const arrays:any = []
    // this.accessPrevilages = []
    this.HotelService.list_privilege().subscribe((res)=>{
      res.privilege.forEach((element:any) => {
        element.isChecked = false
        if(element.privilege_name != 'full auth'){
          arrays.push(element)
        }
      });
      this.list_privilages = res.privilege
      // this.accessPrevilages = res.privilege
      let privilage_filter:any = []

      console.log(this.groupByWebpage())
      privilage_filter = arrays
      
      // privilage_filter.forEach((privilage_4:any) => {
       
      // });
      console.log(this.accessPrevilages)
    })
  }

  // newArray:any = []
  privilages_filter :any = []
  groupByWebpage(): void {
    // Get unique webpage values
    const uniqueWebpages = Array.from(new Set(this.list_privilages.map((item:any) => item.webpage)));
    console.log(uniqueWebpages)
    // Create a new array containing only objects with unique webpage values
    this.privilages_filter = uniqueWebpages.map(webpage => {
      const items = this.list_privilages.filter((item:any) => item.webpage === webpage);
      return {
        webpage: webpage,
        items: items
      };
    });

    console.log(this.privilages_filter);
    // this.privilages_filter.forEach((CoOrdinates:any)	 => {
    //   const uniqueWebpagess = Array.from(new Set(CoOrdinates.items.map((item:any) => item.co_ordinates)));

    //   CoOrdinates.items = uniqueWebpagess.map(cordi => {
    //     const items = CoOrdinates.items.filter((item:any) => item.co_ordinates === cordi);
    //     return {
    //       column2: cordi,
    //       items_2: items
    //     };
    //   });

    // });

    console.log(this.privilages_filter)

  }

  list_role_to_privilege_api(hotel_id:any){
    // PRIVILAGE DETAILS
    // PRIVILAGES DEFAULT CHECKBOX TRUE
    const hotel_name_id ={
      Hotel_Name_id : hotel_id
    }

    this.HotelService.list_role_to_privilege(hotel_name_id).subscribe((res)=>{
      console.log(res)
      this.list_role_to_privilege = res.role_privilege
      console.log(this.privilages_filter)
      
      // FULL AUTH
      const add = {
        group_edit_id : 0,
        role_id : 0,
        id :0,
        isChecked : false
      }

      this.list_role_to_privilege.forEach((element:any) => {
        this.filter_hotel_privilages.forEach((role:any) => {
          if(element.role_id == role.id && element.privilege_id == 1){
            role.full_auth = true
            role.group_edit_id = element.id
          }

          if(element.role_id == role.id){
            const test = role.privilage.find((privi:any) => privi.id == role.role_id)
            role.add = test == undefined ? add : test
          }
        });
      });

      console.log(this.filter_hotel_privilages)
      // this.merge_role_privilages(this.list_role_to_privilege)
    })
  }

  all_hotel_department_designation(){
    this.HotelService.all_hotel_department_designation().subscribe((res)=>{
      console.log(res)
      this.Hotel_deparment_designation = res.message
    })
  }

  isPrivilegeChecked(addId: any, role: any): boolean {
    // return !!privileges.find(privilege => privilege.id == addId);
    const pament_term_group = ['245','247']
    // addId = addId == '245' ? '247' : addId;

    return !!this.list_role_to_privilege.find((exist:any) => exist.privilege_id == addId && exist.role_id == role.id)
  }

  list_designation(hotel_id:any){
    const hotel_name_id ={
      Hotel_Name_id : hotel_id
    }

    this.HotelService.list_designation(hotel_name_id).subscribe((res)=>{
      console.log(res)
      this.filter_hotel_designation = res.designation
    })

    return this.filter_hotel_designation
  }
  removeDuplicatesByProperty(arr: any[], prop: string): any[] {
    const uniqueValues = new Set();
    return arr.filter(item => {
      const value = item[prop];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        return true;
      }
      return false;
    });
  }

  departmentDetails :any = []
  department_table :any = []
  department_get(hotel_id:any){
    const hotel_name_id = {
      Hotel_Name_id : hotel_id
    }

    this.HotelService.list_departments(hotel_name_id).subscribe((res)=>{
      console.log(res)
      this.departmentDetails = res.department

      res.department.forEach((element:any) => {
        this.department_table.push(
          {
            id: element.id,
            Hotel_Name : this.findHotelName(element.hotel_id),
            department : element.department_name
          }
        )
      });
    })
  }

  selectedDepartmentName:any = ''
  deparment_desig_select(desig:any){
    this.selectedDepartmentName = desig.department_name
    this.designation_create.department_id = desig.id
  } 

  hotelDepartment :any = ''
  hotel_deparment_select(hotel:any){
    this.selectedDepartmentName= ''
    this.designation_create.department_id = ''

    this.hotelDepartment = hotel.Hotel_Name
    this.designation_create.Hotel_Name_id = hotel.Hotel_Name_id
    this.department_get(hotel.Hotel_Name_id)
  }

  register_desination_name :any = ''
  register_designation_select(desig:any){
    this.register_desination_name = desig.designations_name
    this.employeeDetails.designation_id = desig.id
  } 

  findHotelName(hotel_id:any){
    const hotel = this.numberOfHotels.find((hotel:any) => hotel.id == hotel_id)
    return this.numberOfHotels != '' ?  hotel.Hotel_Name : []
  }

  splitArrayIntoGroups(array:any, groupSize:any) {
    let result = [];
    for (let i = 0; i < array.length; i += groupSize) {
      result.push(array.slice(i, i + groupSize));
    }
    return result;
  }

  list_user(Hotel_id:any){
    const payload = {
      Hotel_Name_id : Hotel_id
    }
    this.HotelService.list_user(payload).subscribe((res)=>{
      console.log(res)
      this.hotelUsers = res.user_list 
      // this.list_role_user()
      res.admin_user[0].name = res.admin_user[0].name + ' (Admin)'
      this.hotelUsers.push(res.admin_user[0])
    })
  }

  list_role(hotel_id:any){
    const hotel_name_id = {
      Hotel_Name_id : hotel_id
    } 

    this.HotelService.list_role(hotel_name_id).subscribe((res)=>{
      this.typeofRoles = res.role
      this.role_prvilage_heading = []
      this.filter_hotel_privilages = []

      res.role.forEach((element:any) => {
        element.privilage = []
        this.role_prvilage_heading.push(element)
      });
      // this.role_prvilage_heading = res.role
      
      this.role_prvilage_heading.forEach((element:any) => {
        if(element.Hotel_Name_id == hotel_id){
          element.add = {
            id : ''
          }
          this.filter_hotel_privilages.push(element)
        }
      });

      this.list_role_to_privilege_api(hotel_id)

      console.log(this.filter_hotel_privilages)
      console.log(this.role_prvilage_heading)
    })

    
  }

  department_hotel :any = ''
  department(hotel:any){
    console.log(hotel)
    this.department_hotel = hotel.Hotel_Name
    this.department_Create.Hotel_Name_id = hotel.Hotel_Name_id
  }

  desination(hotel:any){
    this.designation_create.Hotel_Name_id = hotel.Hotel_Name_id
    this.department_get(hotel.Hotel_Name_id)
    // this.HotelService.list_departments(hotel_name_id).subscribe((res)=>{
    //   console.log(res)
    // })
  }

  all_hotel_name_dep:any = ''
  list_role_user(hotel_id:any){
    this.all_hotel_name_dep = hotel_id.Hotel_Name
    const hotel_name_id = {
      Hotel_Name_id : hotel_id.Hotel_Name_id
    } 

    this.HotelService.list_role_user(hotel_name_id).subscribe((res)=>{
      if(this.typeofRoles.length > 0){
        res.role_user.forEach((role_user:any) => {
          // role_user.roleName = this.typeofRoles.find((role:any) => role_user.role_id == role.id).role
          // role_user.userName = this.hotelUsers.find((user:any) => user.id == role_user.user_id).name
        });
      }
      
      this.roles_user_table = res.role_user
    })

  }

  getflag(data :any){
    this.flagArr = data;
    this.CountryFlag=false;
    this.mobileNumber='';

    console.log(this.flagArr)
  }

  // DEPARTMENT SELECT VALUE ADDED
  roleDesignationName:any = ''
  role_desination_select(designation:any){
    // this.role_Department_Name = designation.department_name
    this.roleDesignationName = designation.designations_name
    this.addRoleInput.designation_id = designation.id
  }

  // SUBMIT
  mobileNumber:any = ''
  isSubmitClicked:boolean = false
  addRole(){
    this.isSubmitClicked = true
    // DEPARTMENT 
    if(this.isDepartment == true){
      this.HotelService.add_departments(this.department_Create).subscribe((res)=>{
        this.department_Create.department_name = ''
        // this.department_get()
        this.all_hotel_department_designation()
        this.toast.success({detail:"SUCCESS",summary:'Created Department',duration:5000});
      })
    }

    // DESIGNATION ___ 
    if(this.isDesignation == true){
      this.HotelService.add_designation(this.designation_create).subscribe((res)=>{
        this.designation_create.designations_name = ''
        this.all_hotel_department_designation()
        this.toast.success({detail:"SUCCESS",summary:'Created Designation',duration:5000});
      })
    }

    // CREATE ROLE FOR HOTEL
    if(this.isRoll == true){
      const role_id_exist = this.typeofRoles.find((existRole:any) => existRole.role_name == this.addRoleInput.role_name)
      console.log(role_id_exist)
      const role_id = role_id_exist == undefined ? parseInt(this.exist_role_id) : role_id_exist.id
      if(typeof role_id === 'number' && !isNaN(role_id)){
        this.addRoleInput.role_id = this.exist_role_id
        this.HotelService.add_role_designation(this.addRoleInput).subscribe((res)=>{
          console.log(res)
          // this.filter_hotel_privilages = []
          // this.addRoleInput = {}
          this.addRoleInput.role_name = ''
          this.exist_role_name = null
          this.exist_role_id = ''
          // this.HotelName = ''
          this.isSubmitClicked = false
          this.toast.success({detail:"SUCCESS",summary:'Created Role for Hotel',duration:5000});
        })
      }else{
        this.HotelService.add_role(this.addRoleInput).subscribe((res:any)=>{
          // this.addRoleInput = {}
          this.addRoleInput.role_name = ''
          this.exist_role_name = null
          // this.HotelName = ''
          this.isSubmitClicked = false
          this.list_role(this.addRoleInput.Hotel_Name_id)
          this.filter_hotel_privilages = []
          this.toast.success({detail:"SUCCESS",summary:'Created Role for Hotel',duration:5000});
        })
      }
      
    }

    // PRIVILAGE ASSIGN TO ROLE
    if(this.isPrevilages == true){
      this.privilage_to_role.privilage_id = []
      if(this.isFull_auth == true){
        this.privilage_to_role.privilage_id.push(1)
      }

      const payload_api_role:any =  []
      const privil = this.filter_hotel_privilages.filter((data:any) => data.privilage.length > 0)
      console.log(this.filter_hotel_privilages)
      console.log(privil)
      const api_all = privil
      // Looping through each privilege in the array
      api_all.forEach((privi: any) => {
        // Looping through each privilege_id in the current privilege
        // privi.not_exist_role = []
        this.privilage_to_role.privilage_id = [];
        const not_exist_role :any = []
        const exist_role:any = []
      });

      console.log(payload_api_role);
      console.log(api_all)

      let isTrue = false
      if(isTrue = true){
        this.list_role_to_privilege_api(this.privilage_name_id)
      }
    }

    // CREATE EMPLOYEE FOR HOTEL
    if(this.isEmployee == true){
      const dial_code = this.flagArr.dial_code != undefined ? this.flagArr.dial_code : '+91'

      this.employeeDetails.mobileNumber = dial_code + this.mobileNumber
      console.log(this.employeeDetails)
      // this.employeeDetails.reporting_to = '2'
      // TESTING .....      
      this.employeeDetails.date_of_joining = this.date_of_joining != ''? this.date_of_joining:this.send_date
      console.log(this.employeeDetails.date_of_joining)
      this.HotelService.employee_register(this.employeeDetails).subscribe((res)=>{
        console.log(res)

        this.employeeDetails.name = ''
        this.employeeDetails.email = ''

        this.mobileNumber = ''
        this.employeeDetails.country = ''
        this.employeeDetails.state = ''
        this.employeeDetails.city = ''
        this.employeeDetails.zipCode = ''
        this.employeeDetails.role_id = ''

        // COLUMN 2
        this.employeeDetails.Hotel_Name_id = ''
        this.employee_role.Hotel_Name = ''
        this.employee_role.Deparment = ''
        this.register_desination_name = ''
        this.roproting_to = ''
        this.employeeDetails.date_of_joining = ''
        // this.list_user()
        this.toast.success({detail:"SUCCESS",summary:'Employee Created',duration:5000});
      },(error) => {
        console.log(error.error.message)
        this.toast.error({detail:"ERROR",summary:error.error.message,duration:5000});
      })
    }

    // ASSIGN ROLE FOR USER
    if(this.isAssign == true){
      this.HotelService.add_designation_user(this.designation_user).subscribe((res)=>{
        console.log(res)
        // this.list_role_user()
        this.assign_Hotel_Name = ''
        this.assig_desigantion = ''
        this.roproting_to_assign = ''
        this.assign_employee_Name = ''
        this.designation_user.add_to = ''
        this.toast.success({detail:"SUCCESS",summary:'New Employee added in Hotel',duration:5000});

      })
    }
    
  }
  
  newCreateRole(event:any){
    this.addRoleInput.role_name = event
    this.exist_role_id = 'not Exist'
  }
  exist_role_id:any = ''
  existRole_id(existRole:any){
    this.exist_role_name = existRole.role_name
    this.exist_role_id = existRole.id
  }

  roproting_to:any = ''
  roportingTo(user:any){
    this.roproting_to = user.name
    this.employeeDetails.reporting_to = user.id
  }

  roproting_to_assign:any = ''
  roportingToAssignTwo(user:any){
    this.assign_employee_Name = ''
    this.designation_user.add_to = ''

    this.roproting_to_assign = user.name
    this.designation_user.reporting_to = user.id
  }

  deparmentFilter :any = []
  employeeRegisterHotel(hotel:any){
    this.deparmentFilter = []
    this.department_table = []
    this.employee_role.Hotel_Name = hotel.Hotel_Name
    this.employeeDetails.Hotel_Name_id = hotel.Hotel_Name_id
    const filterHotelBasedDep = this.departmentDetails
    this.department_get(hotel.Hotel_Name_id)
    this.list_role_user(hotel.Hotel_Name_id)
    this.list_department_designation()
    this.list_designation(this.employeeDetails.Hotel_Name_id)
    this.list_user(hotel.Hotel_Name_id)

    filterHotelBasedDep.forEach((element:any) => {
      if(hotel.Hotel_Name_id == element.Hotel_Name_id){
        this.deparmentFilter.push(element)
      }
    });
    
  }

  filter_deparment_Roles :any = []
  assign_filter_desig:any = []
  filterRole(dep:any){
    this.filter_deparment_Roles = []
    this.assign_filter_desig = []
    this.employee_role.Deparment = dep.department
    this.employeeDetails.department_id = dep.id
    const filter_dep_dsig = this.list_department_designation_Arr.filter((depart:any) => depart.department_id == dep.id)
    console.log(filter_dep_dsig)
    console.log(this.filter_hotel_designation)
    filter_dep_dsig.forEach((element:any) => {
      this.filter_hotel_designation.forEach((desig:any) => {
        if(element.designation_id == desig.id){
          this.assign_filter_desig.push(desig)
        }
      });
    });
  }

  assign_Hotel_Name:any = ''
  hotel_desig(hotel:any){
    this.assig_desigantion = ''
    this.roproting_to_assign = ''
    this.assign_employee_Name = ''
    this.designation_user.designation_id = ''
    this.designation_user.add_to = ''
    this.designation_user.reporting_to = ''

    this.assign_Hotel_Name = hotel.Hotel_Name
    this.designation_user.Hotel_Name_id = hotel.Hotel_Name_id
    // this.list_role(hotel.Hotel_Name_id)
    this.list_user(hotel.Hotel_Name_id)
    const payload = {
      Hotel_Name_id : hotel.Hotel_Name_id
    }
    this.HotelService.list_designation(payload).subscribe((res)=>{
      this.filter_hotel_designation = res.designation
    })
  }

  assig_desigantion:any = ''
  assign_user_desig(desig:any){
    this.designation_user.add_to = ''
    this.designation_user.reporting_to = ''

    this.assig_desigantion = desig.designations_name
    this.designation_user.designation_id = desig.id
  }

  assign_employee_Name:any = ''
  assign_employee(user:any){
    this.assign_employee_Name = user.name
    this.designation_user.add_to = user.id
  }

  goBack() {
    this.location.back();
  }

  // full_auth(event:any,role:any){
  //   console.log(role)
  //   if(event.target.checked == true){
  //     const payload = {
  //       Hotel_Name_id : this.privilage_name_id,
  //       privilege_id: [1],
  //       role_id: role.id
  //     }
  //     this.HotelService.add_role_to_privilege(payload).subscribe((res)=>{
  //       console.log(res)
  //       this.list_role_to_privilege_api(this.privilage_name_id)
  //     })
  //   }else{
  //     const payload = {
  //       Hotel_Name_id : this.privilage_name_id,
  //       id: role.group_edit_id,
  //       role_id: role.id
  //     }
      
  //     this.HotelService.delete_role_to_privilege(payload).subscribe((res)=>{
  //       console.log(res)
  //     })
  //   }
    
  // }

  isFull_auth :boolean = false
  privilage_actions(event:any,privilage_data:any,role:any,access_type:any){
    console.log(privilage_data)
    console.log(role)

    if(privilage_data == 'full auth'){
      this.isFull_auth = event.target.checked
    }else{
      privilage_data.isChecked = event.target.checked

      if(privilage_data.isChecked == true){
        role.privilage.push(privilage_data)

        const payload = {
          Hotel_Name_id : this.privilage_name_id,
          privilege_id: [privilage_data.id],
          role_id: role.id
        }
        
        this.HotelService.add_role_to_privilege(payload).subscribe((res)=>{
          console.log(res)
          // privilage_data.group_edit_id = ''
          this.list_role_to_privilege_api(this.privilage_name_id)
        })
        console.log(payload)
      }
    }
    console.log(privilage_data)

    if(event.target.checked == false){
      const role_id = this.list_role_to_privilege.find((fin:any) => fin.role_id == role.id && fin.privilege_id == privilage_data.id)
      const payload = {
        Hotel_Name_id : this.privilage_name_id,
        id: role_id.id,
        role_id: role_id.role_id
      }
      this.HotelService.delete_role_to_privilege(payload).subscribe((res)=>{
        console.log(res)
      })
    }
  }

  // merge_role_privilages(api_data:any){
  //   let role:any = []
  //   console.log(this.accessPrevilages)
  //   this.role_prvilage_heading.forEach((element:any) => {
  //     if(element.id == 6){
  //       this.accessPrevilages.forEach((view:any) => {
  //         console.log(view.add_id.id)
  //         if(view.add_id.id == 4){
  //           view.isChecked = true
  //         }
  //       });
  //     }
  //   });

  //   console.log(this.role_prvilage_heading)
  // }

  // filter_role_id(apiData:any,local_role_id:any){
  //   const data = apiData.filter((role:any) => role.role_id == local_role_id)
  //   let idArray = data.map((obj:any) => obj.privilege_id);
  //   console.log(idArray)
  // }

  privilage_select(privilage:any,type:any){
    if(type == 'privilage_data'){
      this.privilage_to_role.privilage_name = privilage.privilege_name
      this.privilage_to_role.privilage_id = privilage.id
    }

    if(type == 'role_data'){
      this.privilage_to_role.role_name = privilage.role
      this.privilage_to_role.role_id = privilage.id
    }

    if(type == 'user_role_data'){
      this.privilage_to_role.user_role_name = privilage.role
      this.privilage_to_role.user_role_id = privilage.id
    }

    if(type == 'user_data'){
      this.privilage_to_role.user_name = privilage.name
      this.privilage_to_role.user_id = privilage.id
    }
  }

  check(event:any,data:any,access:any){
    this.userDetails.forEach((element:any) => {
      if(element.id == data.id){
        if(access == 'create'){
          element.create = event.target.checked
        }
        if(access == 'read'){
          element.read = event.target.checked
        }
        if(access == 'edit'){
          element.edit = event.target.checked
        }
        if(access == 'delete'){
          element.delete = event.target.checked
        }
      }
    });
  }

  selectedButton:any = 'Department'
  buttonclicked(buttonName: string) {
    this.selectedButton = buttonName;
    
    if(buttonName == 'Department'){
      this.isDepartment = true
      this.isDesignation = false
      this.isRoll = false
      this.isEmployee = false
      this.isAssign = false
      this.isPrevilages = false
    }

    if(buttonName == 'Designation'){
      this.isDesignation = true
      this.isDepartment = false
      this.isRoll = false
      this.isEmployee = false
      this.isAssign = false
      this.isPrevilages = false
    }
    
    if(buttonName == 'Roles'){
      this.isRoll = true
      this.isDesignation = false
      this.isDepartment = false
      this.isEmployee = false
      this.isAssign = false
      this.isPrevilages = false
    }

    if(buttonName == 'Privileges'){
      this.HotelService.getDetails().subscribe((res:any) =>{
        console.log(res)
        this.numberOfHotels = res.hotel_registrations
        this.list_role_user(res.hotel_registrations[0])
        this.list_role(res.hotel_registrations[0].Hotel_Name_id)
        this.privilage_hotel(res.hotel_registrations[0])
      })
      
      this.isDepartment = false
      this.isDesignation = false
      this.isRoll = false
      this.isEmployee = false
      this.isAssign = false
      this.isPrevilages = true
    }

    if(buttonName == 'Employees'){
      this.isDepartment = false
      this.isDesignation = false
      this.isRoll = false
      this.isEmployee = true
      this.isAssign = false
      this.isPrevilages = false
    }

    if(buttonName == 'Assign'){
      this.isDepartment = false
      this.isDesignation = false
      this.isRoll = false
      this.isEmployee = false
      this.isAssign = true
      this.isPrevilages = false
    }
    console.log(buttonName)
  }

  filter_hotel_designation :any = []
  selectHotel(hotelDetails:any){
    this.roleDesignationName = ''
    this.addRoleInput.designation_id = ''

    this.addRoleInput.Hotel_Name_id = hotelDetails.Hotel_Name_id
    this.HotelName = hotelDetails.Hotel_Name
    this.filter_hotel_designation = []
    this.list_designation(this.addRoleInput.Hotel_Name_id)
    this.list_role(hotelDetails.Hotel_Name_id)

    // this.departmentDetails.forEach((dep:any) => {
    //   if(dep.Hotel_Name_id == hotelDetails.Hotel_Name_id){
    //     this.filter_hotel_designation.push(dep)
    //   }
    // });
  }

  privilage_name_id :any = ''
  privilage_hotel(hotel:any){
    this.privilage_to_role.hotel_name = hotel.Hotel_Name
    this.privilage_name_id = hotel.Hotel_Name_id
    this.filter_hotel_privilages = []
    this.list_role(hotel.Hotel_Name_id)
  }

  selectRole(role: 'employee' | 'manager' | 'owner' = 'employee') {
    console.log(this.userDetails)    
  }

  // COUNTRY
  listcountry : any = []
  filterData:any = ''
  private fetchCountry(){
    this.CountryStateCityService.all_countery().subscribe(data=>{
    this.listcountry = data.countries
    })
  
  }
  
  country:any = ''
  stateFilter:any='';
  listState :any = []
  onCountrySelected(country:any){
    this.employeeDetails.country = country.name;
    this.country =  country.iso2;
    const payload = {
      country_id : country.id
    }
    this.CountryStateCityService.hotel_countery_start(payload).subscribe(data=>{
      this.listState = data.states;
    })
  
    // if(this.employeeDetails.country == 'United Kingdom' ||this.employeeDetails.country == 'Canada'||this.employeeDetails.country == 'Ireland'|| this.employeeDetails.country == 'Brunei'|| this.employeeDetails.country == 'Netherlands' || this.employeeDetails.country == 'KazaKhstan' ||this.employeeDetails.country == 'Argentina' ||this.employeeDetails.country == 'Swaziland' || this.employeeDetails.country == 'Malta' ||this.employeeDetails.country == 'Peru' || this.employeeDetails.country == 'Somalia'){
    //   this.alphanumeric=true
    //   this.numeric=false
    // }
    // else{
    //   this.alphanumeric=false
    //   this.numeric=true
    // }


  }

  state:any = ''
  listCity :any = []
  onStateSelected(state:any){
    this.employeeDetails.state = state.name;
    this.state = state.iso2;
    const payload = {
      country_id : state.country_id,
      state_id : state.id
    }
    this.CountryStateCityService.hotel_countery_start_city(payload).subscribe(data=>{
    console.log(data)
    this.listCity = data.city
    })

  }
    
  cityFilter:any =''
  cityData:any = []
  onStateCity(city:any){
    this.cityFilter=''; 
    this.cityData = city
  } 
  dateTime() {
    // Get current date and time using Luxon
    const currentDate = DateTime.local();
    // Get the month abbreviation
    const monthAbbreviation = currentDate.toFormat('LLL'); // 'LLL' gives the abbreviated month name
    // Format date in 'dd-MMM-yyyy' format
   const sendtodaydate =currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy');
    // Assign the formatted date to dateString
    this.send_date = sendtodaydate;
  }
}
