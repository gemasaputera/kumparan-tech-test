import React from "react";

function ProfileTop({ data }) {
  console.log(`data`, data);
  return (
    <>
      <div
        className="relative bg-gray-200 h-16"
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <div
          className="absolute bg-gray-400 h-24 w-24 rounded-full"
          style={{ bottom: "-3rem" }}
        />
      </div>
      <div className="pt-14" style={{ paddingLeft: 16, paddingRight: 16 }}>
        <p className="font-bold text-2xl">{data.name}</p>
        <span className="text-gray-500">@{data.username}</span>
        <p className="mt-2">{data.email}</p>
        <p className="text-sm">{data.phone}</p>
      </div>
    </>
  );
}

export default ProfileTop;
