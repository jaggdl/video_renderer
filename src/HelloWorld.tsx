import React from 'react'
import {spring, staticFile, useVideoConfig} from 'remotion';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	Img,
	useCurrentFrame,
} from 'remotion';
import {Title} from './HelloWorld/Title';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

const fontPath = '/fonts/Open_Sans/OpenSans-Bold.ttf'

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	backgroundImages: z.array(z.string()), // Updated to an array of strings
	audioTrack: z.string(),
	height: z.number(),
	width: z.number(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	backgroundImages,
	audioTrack,
}) => {
	const { fps, durationInFrames, width, height } = useVideoConfig();
	const frame = useCurrentFrame();
	const numberOfImages = backgroundImages.length;
	const framePerImage = durationInFrames / numberOfImages;

	const currentImageIndex = Math.min(
		Math.floor(frame / framePerImage),
		numberOfImages - 1
	);

	const fadeOutStart = 270;  // Frames
	const fadeInLength = 12;
	const fadeInStart = 75;

	// Fade out the animation at the end
	const titleEnterOpacity = interpolate(
		frame,
		[fadeInStart, fadeInStart + fadeInLength],
		[0, 1],
		{
			extrapolateLeft: 'extend',
			extrapolateRight: 'clamp',
		}  
	)

	const titleOutOpacity = interpolate(
		frame,
		[fadeOutStart, fadeOutStart + fadeInLength],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'extend',
		}
	);
	let opacity = titleEnterOpacity + titleOutOpacity; 

	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Img
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
					src={staticFile(backgroundImages[currentImageIndex])}
				/>
    </AbsoluteFill>
			<AbsoluteFill style={{ opacity, backdropFilter: 'blur(20px)' }}>
					<Sequence from={fadeInStart - fadeInLength}>
						<Title titleText={propOne} titleColor={propTwo} />
					</Sequence> 
			</AbsoluteFill>
			<Audio src={staticFile(audioTrack)} />
		</AbsoluteFill>
	);
};
