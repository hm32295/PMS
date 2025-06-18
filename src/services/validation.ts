export let EMAIL_VALIDION ={
    required: "email is reqired",
    pattern: {
        value :/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim ,
        message :"email is not valied"
    }
  }