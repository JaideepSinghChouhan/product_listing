"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

function useCardsPerView() {
	const [cardsPerView, setCardsPerView] = useState(4);

	useEffect(() => {
		const update = () => {
			if (window.innerWidth < 640) {
				setCardsPerView(1);
				return;
			}

			if (window.innerWidth < 1280) {
				setCardsPerView(2);
				return;
			}

			setCardsPerView(4);
		};

		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return cardsPerView;
}

export function VideoSection() {
	const [videos, setVideos] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const cardsPerView = useCardsPerView();

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const res = await fetch("/api/videos");
				const data = await res.json();
				setVideos(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error("Video fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	const maxIndex = useMemo(() => {
		return Math.max(0, videos.length - cardsPerView);
	}, [videos.length, cardsPerView]);

	useEffect(() => {
		if (currentIndex > maxIndex) {
			setCurrentIndex(maxIndex);
		}
	}, [currentIndex, maxIndex]);

	if (loading) return null;

	if (!videos.length) return null;

	const next = () => {
		setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
	};

	const prev = () => {
		setCurrentIndex((prev) => Math.max(prev - 1, 0));
	};

	return (
		<section className="py-12 sm:py-16 md:py-20">
			<div className="px-4 sm:px-6 md:px-12 mb-8 text-center">
				<p className="text-xs tracking-[0.3em] uppercase text-foreground-muted inline-flex items-center gap-3">
					<span className="w-10 h-px bg-border" />
					Videos
					<span className="w-10 h-px bg-border" />
				</p>

				<h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl mt-3">
					Watch How Products Come Alive
				</h2>

				<p className="text-sm text-foreground-muted mt-2 max-w-2xl mx-auto">
					Browse portrait product videos and slide through the collection using the arrows.
				</p>
			</div>

			<div className="px-4 sm:px-6 md:px-12 relative">
				<div className="overflow-hidden">
					<div
						className="flex transition-transform duration-500 ease-out"
						style={{
							transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
						}}
					>
						{videos.map((video) => (
							<div
								key={video.id}
								className="shrink-0 px-2"
								style={{ width: `${100 / cardsPerView}%` }}
							>
								<div className="relative aspect-[9/16] rounded-[28px] overflow-hidden border bg-black shadow-sm group">
									{video.url ? (
										<video
											src={video.url}
											poster={video.thumbnailUrl || undefined}
											className="w-full h-full object-cover"
											muted
											autoPlay
											loop
											playsInline
											preload="metadata"
										/>
									) : (
										<div className="w-full h-full bg-secondary" />
									)}

									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

									<div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
										<Play className="w-4 h-4 ml-0.5" />
									</div>

									<div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
										{video.thumbnailUrl ? (
											<div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/50 shrink-0">
												<Image
													src={video.thumbnailUrl}
													alt={video.title}
													fill
													sizes="48px"
													className="object-cover"
													loading="lazy"
												/>
											</div>
										) : (
											<div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 shrink-0" />
										)}

										<div className="min-w-0 text-white">
											<p className="text-xs uppercase tracking-[0.18em] text-white/75">
												Product Reel
											</p>
											<h3 className="text-sm sm:text-base font-medium truncate">
												{video.title}
											</h3>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{videos.length > cardsPerView && (
					<>
						<button
							onClick={prev}
							disabled={currentIndex === 0}
							className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border shadow-sm flex items-center justify-center disabled:opacity-40"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>

						<button
							onClick={next}
							disabled={currentIndex === maxIndex}
							className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border shadow-sm flex items-center justify-center disabled:opacity-40"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</>
				)}
			</div>
		</section>
	);
}
