export const Query_Get_User_By_Phone = (phone: string) => {
  return `Select U.*,R.role_name,A.phone, A.password, A.salt
  from users U
           inner join auth A on U.user_id = a.user_id
  inner join roles R on R.id = U."roleId"
  where a.phone = '${phone}'`;
};
