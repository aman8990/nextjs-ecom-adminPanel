function UserDetails({ user }) {
  const address = user?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-32 p-3 md:p-6 md:text-lg space-y-2">
      <div>
        <div>User ID : {user.id}</div>
        <div>Name : {user.name}</div>
        <div>Email : {user.email}</div>
        <div>Phone No : {user.phone}</div>
        <div>Address : {fullAddress}</div>
        <div>Role : {user.role}</div>
      </div>
    </div>
  );
}

export default UserDetails;
