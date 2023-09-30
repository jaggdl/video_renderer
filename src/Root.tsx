import {Composition, staticFile} from 'remotion';
import { getAudioDurationInSeconds } from "@remotion/media-utils";

import {HelloWorld, myCompSchema} from './HelloWorld';

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
					titleText:
						'"En laarroyo siempre gana; no a través de la fuerza, pero a través de la persistencia" - Buddha',
					titleColor: '#000000',
					backgroundImages: [
						'/5_Unexpected_side_of_Granada,_surprise_me_with_a_unique_perspective..png',
						'/A_futuristic_educational_session_promoting_AI_awareness_and_strategies_to_prevent_AI_dominance,_emphasizing_human_and_AI_interaction_0.png',
					],
					audioTrack:
						'/track_Fomentar_la_colaboracin_en_lugar_de_la_competencia.wav',
					width: 1024,
					height: 1024,
				}}
				calculateMetadata={async ({props}) => {
					const audioDurationInSeconds = await getAudioDurationInSeconds(
						staticFile(props.audioTrack)
					);

					return {
						durationInFrames: Math.ceil(
							audioDurationInSeconds * framesPerSecond
						),
						width: props.width,
						height: props.height,
					};
				}}
			/>
		</>
	);
};
