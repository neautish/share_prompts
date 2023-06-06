"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
	const { data: session } = useSession();

	// const [session, setSession] = useState(true);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const [providers, setProviders] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	return (
		<header className="w-full ">
			<nav className="flex-between mb-16 pt-3">
				<Link href="/" className="flex gap-2">
					<Image className="object-contain" src="/assets/images/logo.svg" alt="logo" width={30} height={30} />
					<p className="logo_text">SharePrompts</p>
				</Link>

				{/* Desktop Navigation */}
				<div className="sm:flex hidden">
					{session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<Link href="/create-prompt" className="black_btn">
								Create Post
							</Link>

							<button type="button" className="outline_btn" onClick={() => signOut()}>
								Sign Out
							</button>

							<Link href="/profile">
								<Image src={session?.user?.image} width={37} height={37} alt="profile" className="rounded-full" />
							</Link>
						</div>
					) : (
						<div className="flex items-center gap-1">
							<span className="text-sm font-semibold font-satoshi">Login with: </span>

							{providers &&
								Object.values(providers).map((provider) => (
									<button
										type="button"
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
									>
										<img src={`/assets/icons/${provider.name}.svg`} alt={provider.name} width={37} height={37} />
									</button>
								))}
						</div>
					)}
				</div>

				{/* Mobile Navigation */}
				<div className="sm:hidden flex relative">
					{session?.user ? (
						<div className="flex">
							<Image
								src={session?.user?.image}
								alt="profile"
								className="rounded-full"
								width={37}
								height={37}
								onClick={() => setToggleDropdown((prev) => !prev)}
							/>

							{toggleDropdown && (
								<div className="dropdown">
									<h3 className="text-base font-bold">{session.user.name}</h3>
									<Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
										My Profile
									</Link>
									<Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
										Create Prompt
									</Link>
									<button
										type="button"
										className="black_btn w-full mt-5"
										onClick={() => {
											setToggleDropdown(false);
											signOut();
										}}
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										type="button"
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
									>
										<img src={`/assets/icons/${provider.name}.svg`} alt={provider.name} width={40} height={40} />
									</button>
								))}
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Nav;
