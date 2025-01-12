import React, { useState } from 'react';
import Button from '@/app/_components/Button';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';

function UserQuery({ query, data, mutate }) {
  const [isLoading, setIsLoading] = useState(false);
  const id = query?.id;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/deleteUserQuery', { id });

      if (res.status === 200) {
        const updatedQueries = data.filter((query) => query.id !== id);
        mutate(updatedQueries, false);

        toast.dismiss();
        toast.success('Query Deleted');
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Error in Deleting Query');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-5 p-3 md:p-6 md:text-lg space-y-2">
      <div>
        <div>Query ID : {query.id}</div>
        <div>Name : {query.name}</div>
        <div>Phone No : {query.phone}</div>
        <div>Email : {query.email}</div>
        <div>Subject : {query.subject}</div>
        <div>Description : {query.description}</div>
      </div>

      <div className="flex items-center gap-6">
        <Button color="red" onClick={() => handleClick()}>
          {isLoading ? <SpinnerMini /> : 'Delete'}
        </Button>
      </div>
    </div>
  );
}

export default UserQuery;
