import {spring, staticFile} from 'remotion';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	durationInFrames: z.number(),
	backgroundImage: z.string(),
	audioTrack: z.string(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	durationInFrames,
	backgroundImage,
	audioTrack,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Animate from 0 to 1 after 25 frames
	const logoTranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});

	// Move the logo up by 150 pixels once the transition starts
	const logoTranslation = interpolate(
		logoTranslationProgress,
		[0, 1],
		[0, -150]
	);

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'white', backgroundImage: `url("${staticFile(backgroundImage)}")`}}>
			<AbsoluteFill style={{opacity}}>
				{/* Sequences can shift the time for its children! */}
				<Sequence from={0}>
					<Title titleText={propOne} titleColor={propTwo} />
				</Sequence>
				{/* The subtitle will only enter on the 75th frame. */}
				{/* <Sequence from={75}>
					<Subtitle />
				</Sequence> */}
			</AbsoluteFill>
			<Audio src={staticFile(audioTrack)} />
		</AbsoluteFill>
	);
};
