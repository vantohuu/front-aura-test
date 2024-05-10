'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { Input, Switch } from 'antd';
import { FormModal } from "../../components/FormModal";
import axios from 'axios';




// const [toggleMenu, setToggleMenu] = useState(false)



export default function Home() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [love, setLove] = useState(false);
  const [mode, setMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [dataSource, setDataSource] = useState([{
    "id": 1,
    "vote": 1,
    "voteNum": 17,
    "name": "Don Banks",
    "open_until": 9,
    "address": "1524 Wiolu Way",
    "average_check": 1330,
    "description": "European, georgian cuisine",
    "img": "/nh0.jpg"
}]);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_BE_HOST + '/restaurant/get-all')
      .then(response => {
        setDataSource(response.data.data)
        console.log(response.data.data)

      }
      )
      .catch(error => console.log(error));
  }, []);

  console.log("dataSource", dataSource)

  const onChange = (checked) => {
    // console.log(`switch to ${checked}`);
    setMode(!mode)
  };

  const onClickMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const onClickLove = () => {
    setLove(!love);
  };

  const onBack = () => {
    if (index > 0) setIndex(index - 1);
    console.log(index)
  };
  const onNext = () => {
    if (index < dataSource.length - 1) setIndex(index + 1)
    console.log(index)

  };
  const listStar = (number) => {
    const list = []
    for (let i = 0; i < number; i++) {
      list.push(
        <Image className='md:m-1 ml-1' height={20} width={20} src="/star_1.png">
        </Image>
      )
    }
    for (let i = number; i < 5; i++) {
      list.push(
        <Image className='md:m-1 ml-1' height={20} width={20} src="/star_0.png">
        </Image>
      )
    }
    return list;
  }

  const infoRes = () => {
    return (
      <div className='flex flex-col w-100'>
        <div className='flex items-center'>
          <Image className='my-3' height={15} width={15} src="/clock.png">
          </Image>
          <p className="ml-2 text-wrap">{"Open until " + dataSource[index].open_until + "PM"}</p>
        </div>
        <div className='flex items-center'>
          <Image className='my-3' height={15} width={15} src="/location.png">
          </Image>
          <p className="ml-2 text-wrap">{dataSource[index].address}</p>
        </div>
        <div className='flex items-center'>
          <Image className='my-3' height={15} width={15} src="/bill.png">
          </Image>
          <p className="ml-2 text-wrap">{"Average check: " + dataSource[index].average_check + "$"}</p>
        </div>
        <div className='flex items-center'>
          <Image className='my-3' height={15} width={15} src="/food.png">
          </Image>
          <p className="ml-2 text-wrap">{ dataSource[index].description}</p>
        </div>
      </div>
    );
  }
  const MenuConponent = () => {
    if (toggleMenu)
      return (
        <>
          <div className={"flex items-center mt-2 lg:hidden w-full rounded-s px-3 py-1 " + (mode ? "bg-slate-600 " : "bg-amber-700")}>
            <a href="#" className="flex-1 text-center	 text-slate-400 mx-3 hover:text-white ">
              Fillter
            </a>
            <a href="#" className="flex-1 text-center	 text-slate-400 mx-3  hover:text-white ">
              Map
            </a>
            <a href="#" className="text-slate-400 hover:text-white">
              Sign In
            </a>
          </div>
        </>
      )

  }
  return (
    <main className={"flex flex-col items-center justify-between w-full h-full min-h-screen  py-3 " + (mode ? "bg-zinc-900 " : "bg-red-800")}>
      <header className="w-full text-nowrap" >
        <nav className="flex flex-col items-center lg:p-5 p-3 w-full  font-mono	">
          <div className="flex items-center w-full">
            <p className="font-semibold text-xl text-white lg:ml-3 lg:mr-8 mr-4">EatOut</p>
            <div className={"flex-none  text-teal-200 hover:text-white lg:mx-8"}>
              <div className={"w-[200px] rounded-xl h-[30px] flex p-2 " + (mode ? "bg-slate-600 " : "bg-amber-700")} >
                <input placeholder="Find a restaurant" className={"w-[160px] text-sm outline-none font-sans " + (mode ? "bg-slate-600 " : "bg-amber-700")}></input>
                <button className="flex justify-center items-center">
                  <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full lg:flex lg:items-center hidden">
              <div className="flex items-center grow">
                <a href="#" className="text-slate-400 mx-3 hover:text-white mr-4">
                  Fillter
                </a>
                <a href="#" className="text-slate-400 mx-3  hover:text-white mr-4">
                  Map
                </a>
              </div>

              <a href="#" className=" text-slate-400 hover:text-white mr-4">
                Sign In
              </a>
            </div>

            <div className="grow lg:hidden ml-1 flex items-center justify-end">
              <button className="flex items-center  px-3 py-2 border rounded text-teal-200 hover:text-white hover:border-white"
                onClick={onClickMenu}
              >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
              </button>
            </div>
          </div>
          <MenuConponent />
        </nav>

      </header>
      <section className="flex-1 w-full h-full flex p-3 lg:p-8">
        <div className="w-full h-full  flex-1 grid lg:grid-cols-2 grid-cols-1 bg-white rounded-sm p-5 overflow:auto ">
          <div className="col-span-auto flex flex-col justify-center items-center  ">
            <div className='flex flex-col mt-4 justify-center items-center w-full h-full '>
              <div className='flex items-center w-full lg:px-10 md:px-10' >
                <div className='flex flex-1 items-center'>
                  {listStar(dataSource[index].vote)}
                  <p className="font-bold text-red-500 ml-2 text-[20px]">{dataSource[index].voteNum}
                  </p>
                </div>
                <div className='flex items-center' >
                  <button>
                    <Image  onClick={onClickLove} className='m-2 animate-jump animate-infinite animate-duration-[2000ms] animate-delay-100' src={love ? "/love_1.png" : "/love_0.png"} height={24} width={24}></Image>
                  </button>
                  <button>
                    <Image className="m-2" src="/share.png" height={24} width={24}></Image>
                  </button>
                </div>
              </div>
              <p className='px-10 py-12 text-wrap font-bold text-4xl animate-wiggle-more animate-infinite animate-duration-[2000ms] animate-delay-100'>{dataSource[index].name}</p>
              <div className="w-full px-10 text-slate-600">
                {infoRes()}
              </div>
              <FormModal className ="w-[180px] my-5 h-[50px] font-bold rounded-full hover:bg-red-700 bg-red-500" restaurantId={dataSource[index].id}></FormModal>
            </div>

          </div>
          <div className="col-span-1">
            <Image  width={500} height={500}  loader={() => process.env.NEXT_PUBLIC_BE_HOST+ dataSource[index].img} className="rounded-md w-full " src={process.env.NEXT_PUBLIC_BE_HOST+ dataSource[index].img} ></Image>
          </div>
          <div className={index <= 0 ? "hidden " : "absolute " + " md:left-10 left-1 top-1/2 "}>
            <button onClick={onBack} className='w-[40px] h-[50px] justify-between items-center rounded-md hover:bg-slate-400/50 bg-slate-200/75 text-center'>
              <Image src="/back.png" width={30} height={30}>
              </Image>
            </button>
          </div>
          <div className={index >= dataSource.length - 1 ? "hidden " : "absolute " + " md:right-10 right-1 top-1/2"}>
            <button onClick={onNext} className='w-[40px] h-[50px] flex justify-between items-center rounded-md hover:bg-slate-400/50 bg-slate-200/75 text-center'>
              <Image src="/next.png" width={30} height={30}>
              </Image>
            </button>
          </div>
        </div>

      </section>
      <footer className="w-full text-white font-bold h-10 flex justify-center items-center">
        <div className="p-2 rounded-lg bg-white/10">
          <span>Mode      :</span>
          <Switch onChange={onChange}></Switch>
        </div>
      </footer>
    </main>
  );
}
