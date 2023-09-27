import {Composition, staticFile} from 'remotion';
import { getVideoMetadata } from "@remotion/media-utils";
import { getInputProps } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
 
const inputProps = getInputProps();

import {HelloWorld, myCompSchema} from './HelloWorld';
import {Logo, myCompSchema2} from './HelloWorld/Logo';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	const framesPerSecond = 30

	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={120}
				fps={framesPerSecond}
				width={1024}
				height={1024}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Error en producción sin backup reciente',
					titleColor: '#000000',
					backgroundImage: '/example.png',
					durationInFrames: 240,
					audioTrack: '/item_track_example.wav'
				}}
				calculateMetadata={async ({ props }) => {
					const audioDurationInSeconds = await getAudioDurationInSeconds(staticFile(props.audioTrack))

		 			return {
						durationInFrames: Math.ceil(audioDurationInSeconds * framesPerSecond)
					};
				}}
			/>
		</>
	);
};
