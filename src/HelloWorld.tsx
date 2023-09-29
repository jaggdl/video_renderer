import {spring, staticFile, useVideoConfig} from 'remotion';
import { preloadImage } from "@remotion/preload";
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	useCurrentFrame,
} from 'remotion';
import {Title} from './HelloWorld/Title';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';


export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	backgroundImages: z.array(z.string()), // Updated to an array of strings
	audioTrack: z.string(),
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

	backgroundImages.forEach(bgImg => preloadImage(staticFile(bgImg)));

	// Calculate the index of the current background image
	const currentImageIndex = Math.min(
		Math.floor(frame / framePerImage),
		numberOfImages - 1
	);

	const fadeOutStart = 340; 

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[fadeOutStart, fadeOutStart + 8],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<AbsoluteFill style={{ backgroundColor: 'white', backgroundImage: `url("${staticFile(backgroundImages[currentImageIndex])}")` }}>
			<AbsoluteFill style={{ opacity }}>
				<Sequence from={0}>
					<Title titleText={propOne} titleColor={propTwo} />
				</Sequence>
			</AbsoluteFill>
			<Audio src={staticFile(audioTrack)} />
		</AbsoluteFill>
	);
};
