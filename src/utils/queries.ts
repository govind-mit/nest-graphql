// ------------------------------------------------------
// THIS FILE  GENERATED FOR GRAPHQL DOCS SCHEMA GENERATED
// ------------------------------------------------------

import gql from 'graphql-tag';

//get authorizationtoken
export const getayaAuthorizationToken = gql`
  query {
    generateAuthorizationToken {
      message
      status
      token
    }
  }
`;

//#############################################  roles mutatuion and query  #############################################
// create role mutation
export const createRoleMutation = gql`
  mutation {
    createRole(createRoleData: { role_name: "User" }) {
      id
      role_name
    }
  }
`;

// get roles
export const getRolesQuery = gql`
  query {
    getRoles {
      id
      role_name
    }
  }
`;

//get roles by id
export const getRolesById = gql`
  query {
    getRoleById(id: 1) {
      id
      role_name
    }
  }
`;

// update role mutations
export const updateRoleMutation = gql`
  mutation {
    updateRole(updateRoleData: { id: 1, role_name: "admin" }) {
      id
      role_name
    }
  }
`;

//#############################################  user mutatuion and query  #############################################
// user registration mutations
export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: {
        first_name: "Shubham Kumar"
        last_name: "jaiswal"
        email: "sj2585097@gmail.com"
        phone: "9131649079"
        password: "Shubham#12"
        role_id: 2
      }
    ) {
      first_name
      last_name
      email
      phone
      role_id
    }
  }
`;

// update user mutations
export const updateUserMutation = gql`
  mutation {
    updateUser(
      updateUserData: {
        id: 9
        first_name: "Varun"
        last_name: "patidar"
        email: "sj2585097@gmail.com"
        phone: "7089413024"
      }
    ) {
      id
      first_name
      last_name
      email
      phone
    }
  }
`;

// get users
export const getUsersQuery = gql`
  query {
    getUsers {
      id
      first_name
      last_name
      email
      phone
      status
      role_id
      created_at
      updated_at
    }
  }
`;

//get user by id
export const getUserById = gql`
  query {
    getUserById(id: 1) {
      id
      first_name
      last_name
      email
      phone
      status
      role_id
      created_at
      updated_at
    }
  }
`;

//####################################################### auth user mutation and query #####################################################
// login user
export const loginUserMutation = gql`
  mutation {
    login(
      userLoginData: { email: "sj2585097@gmail.com", password: "Shubham" }
    ) {
      message
      status
      token
    }
  }
`;

//forgot password
export const forgotPasswordMutation = gql`
  mutation {
    forgotPassword(userEmail: "sj2585097@gmail.com")
  }
`;

//verify opt
export const verifyOpt = gql`
  mutation {
    verifyOtp(verifyOtpData: { email: "sj2585097@gmail.com", otp: 4068 }) {
      message
      status
      token
    }
  }
`;

//reset password Mutation
export const ResetPasswordMutation = gql`
  mutation {
    resetpasssword(
      resetPasswordInput: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJpZCI6MjksIm5hbWUiOiJTaHViaGFtIEt1bWFyIGphaXN3YWwiLCJpYXQiOjE3MTA0OTIxODl9.VSanqvy8sis1vHNKlKMe0erPbbOKqeWaB-66lhuejwM"
        password: "Shubham"
      }
    )
  }
`;

//######################################################## availability mutation and query ################################################
// add availability mutations weekly
export const createAvailabilityMutation = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createAvalibility(
    createAvailabilityData: {
      key: "weekly",
      value: {
        monday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        tuesday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        wednesday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        thursday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        friday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        saturday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        sunday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ]
      }
    }
  ){
    id
    userId
    key
    value
  }
}
`;

// add availability mutation by date key
export const createAvailabilityMutationBydate = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createAvalibility(
    createAvailabilityData: {
      key: "date",
      value: {
        dates: [
          { date: "20-03-2024",
            slots:[
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "08:00",
                endTime: "12:00"
              }
            ]
          },
          {
            date: "20-04-2024",
            slots : [
              {
                startTime: "13:00",
                endTime: "17:00"
              },
              {
                startTime: "13:00",
                endTime: "17:00"
              },
              {
                startTime: "13:00",
                endTime: "17:00"
              }
            ]
          }
        ]
      }
    }
  ){
    id
    userId
    key
    value
  }
}
`;

// add availability mutation by holiday key
export const createAvailabilityMutationByHoliday = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createAvalibility(
    createAvailabilityData: {
      key: "holiday",
      value: {
        dates: [
          { date: "20-03-2024",
            slots:[
              {}
            ]
          },
          {
            date: "20-04-2024",
            slots : [
              {}
            ]
          }
        ]
      }
    }
  ){
    id
    userId
    key
    value
  }
}
`;

//get availability by userId
export const getAvailabilityMutation = gql`
// eslint-disable-next-line prettier/prettier
query {
  getAvailabilityById(userId: 14) {
    message
    status
    values
  }
}
`;

//update availability mutation weekly by userId and key
export const updateAvailability = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  updateAvailability(
    updateAvalibilityData: {
      key: "weekly",
      value: {
        monday: [
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        tuesday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        wednesday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        thursday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        friday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        saturday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ],
        sunday: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "13:00",
            endTime: "17:00"
          }
        ]
      }
    }
  ){
    id
    userId
    key
    value
  }
}
`;

// #######################################  schedules mutation and query #################################################################
//create site options
export const createSchedule = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createSchedule(
    createScheduleData: {
      user_id : 14
      date : "2024-03-20T00:00:00.000Z"
      start_time: "2:10"
      end_time: "1:20"
      type: "free"
    }
  ){
    id
    user_id
    date
    start_time
    end_time
    type
  }
}
`;

//update schedule
export const updateSchedule = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  updateScheduleByIdandUserId(
    updateScheduleData: {
      user_id:14
      schedule_id:1
      date : "2024-03-20T00:00:00.000Z"
      start_time: "2:20"
      end_time: "1:0"
      type: "paid"
      status: "cancled"
    }
  ){
    id
    user_id
    date
    start_time
    end_time
    type
    status
  }
}
`;

//get schedules by userId
export const getScheduleByUserId = gql`
// eslint-disable-next-line prettier/prettier
query {
  getSchedulesByUserId(userId: 14) {
    id
    user_id
    date
    start_time
    end_time
    type
    status
  }
}
`;

//########################################    site options mutation and query  #########################################

//create site options
export const createOption = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createOption(
    createOptionData: {
      option_key: "org_stripe_keys",
      option_value: {
              startTime: "08:00",
              endTime: "12:00" 
        }
      }
  ){
    id
    option_key
    option_value
  }
}
`;

//update  site option
export const updateOption = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  updateOption(
    updateOptionData: {
      option_key: "org_stripe_keys",
      option_value: {
              startTime: "08:00dsfdsfsdfdfgdfg",
              endTime: "12:00dsfdsfdsfdsfsdf" 
        }
      }
  ){
    id
    option_key
    option_value
  }
}
`;

//get site option
export const getOptions = gql`
// eslint-disable-next-line prettier/prettier
query {
  getOptions {
   option_key
   option_value
  }
}
`;

//###########################################################  Email templates mutation and query ################################
//update email template
export const updateEmailTemplate = gql`
  mutation {
    updateEmailTemplate(
      updateEmailTemplateData: {
        id: 1
        subject: "Welcome Email Templates"
        email_action: "dfrgdfg"
        content: """
        <div style="max-width: 600px; margin: 0px auto;" class="email-container bg_white">
          <div style="text-align: center">
            <div style="background: #E8661B;height:10px;margin-bottom:10px;"></div>
            <img src="https://api-mangoit-lms.mangoitsol.com/{{org_logo}}" width="180px" height="50px" />
            <div style="background: #E8661B;height:2px;margin-top:10px;"></div>
          </div>
          <div style="padding:15px">
            <h1 style="font-size: 23px;color: #E8661B;font-weight: bold;text-align:center;margin-top:10px">RESET PASSWORD</h1>
            <p style="margin-bottom:10px">Hi {{username}}, </p>
            <p style="margin-bottom:10px">We’ve received a request to reset the password for your account!
              <span>If you did not make this request then please ignore this email.</span>
            </p>
            <p style="margin-bottom:10px">Otherwise, please click this link to change your password -
              <a href="https://mangoit-lms.mangoitsol.com/resetpassword/{{forgotPasswordToken}}" style="color:#22489e"> Reset Password </a></p>
            <span>Thanks & Regards,</span><br/>
            <span style="color:#E8661B">MangoIT Solutions</span><br/>
            <span> Email : mangoitsols@gmail.com </span>
          </div>
          <div style="background: #E8661B;height:2px;margin-bottom:10px;"></div>
        </div>
        """
      }
    ) {
      id
      subject
      email_action
      content
    }
  }
`;

//get email templatea
export const getEmailTemplates = gql`
// eslint-disable-next-line prettier/prettier
query {
  getEmailTemplates {
    id
    subject
    email_action
    content
  }
}
`;

//get email template by id
export const getEmailTemplatesById = gql`
// eslint-disable-next-line prettier/prettier
query {
  getEmailTemplateByid(id: 1) {
    id
    subject
    email_action
    content
  }
}
`;

//get email template by email action
export const getEmailTemplatesEmailAction = gql`
// eslint-disable-next-line prettier/prettier
query {
  getEmailTemplateByEmailAction(email_action: "welcome_email_templates") {
    id
    subject
    email_action
    content
  }
}
`;

//################################# schedule order mutation snd query #################################################################
//crearte schedule order
export const scheduleOrder = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createOrder(createOrderData:{
    schedule_id: 1
    user_id: 1
    amount: 200
  }){
  id
  schedule_id
  user_id
  amount
  payment_date
  status
}
}
`;

//get schedule order

//################################ payment mutation and query functions #################################

//create payment link
export const createPaymentLink = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createpaymentLink(
    createPaymentData: {
       product_name : "basic schedule"
       amount :12
       customer_name : "Shubham Kumar jaiswal"
       customer_email : "govind@mangoitsolutions.com"
    }
  )
}
`;

//get payment details
export const getPaymentDetails = gql`
  query {
    getPaymentDetails(
      cs_test_key: "cs_test_a1h8fZWmNobtHA9obCXQPWVws6NFgNGEIKVTZHVNrfdvvXgpADlVtEjPNy"
    )
  }
`;

// create user payment
export const createUserPayment = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createUserPayment(
    createPaymentData: {
       user_id:1
       customer_id : "cus_Pme0VJaE877wOZ"
       payment_profile_id : "pi_3Ox4jwLVp3cdDpUh0HWGz21C"
    }
  ){
    id
    user_id
    customer_id
    payment_profile_id
  }
}`;

//create user payment options
export const createPaymentOptions = gql`
// eslint-disable-next-line prettier/prettier
mutation {
  createUserPaymentOptions(
    createPaymentOptionData: {
      user_payment_id: "sdfkjdkjsff"
      option_name: "card_info"
      option_value: {
              card_no: "424242424242424242"
              exp_date: "03/30" 
              cvv : "278"
        }
      }
  ){
    id
    user_payment_id
    option_name
    option_value
  }
}
`;

//##################################################### get dashboard query #################################################################
//get dashboard data
export const getDashboardDataCounts = gql`
  query {
    getDashboardDataCounts
  }
`;

//get dashboard data today by user id
export const getDashboardDataToday = gql`
  query {
    getDashboardDataByUserId(id: 14)
  }
`;
