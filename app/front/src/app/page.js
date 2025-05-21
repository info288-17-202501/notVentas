"use client";
import React from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import Banner from "../components/ui/banner";

function Page(){
		return (
			<>
				<Navbar />
				<Banner />
				<Footer />
			</>
		);
}

export default Page;