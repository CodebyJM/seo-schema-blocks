import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		itemName,
		itemUrl,
		ratingValue,
		ratingCount,
		bestRating = '5',
		worstRating = '1',
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'gsb-rating-block-editor',
	} );

	const best = bestRating || '5';
	const worst = worstRating || '1';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Rating Details', 'seo-schema-blocks' ) } initialOpen>
					<TextControl
						label={ __( 'Item Name', 'seo-schema-blocks' ) }
						value={ itemName }
						onChange={ ( value ) => setAttributes( { itemName: value } ) }
					/>
					<TextControl
						label={ __( 'Item URL', 'seo-schema-blocks' ) }
						value={ itemUrl }
						onChange={ ( value ) => setAttributes( { itemUrl: value } ) }
						help={ __( 'Defaults to this page URL if empty.', 'seo-schema-blocks' ) }
					/>
					<TextControl
						label={ __( 'Rating Value', 'seo-schema-blocks' ) }
						value={ ratingValue }
						onChange={ ( value ) => setAttributes( { ratingValue: value } ) }
						required
						help={ __( 'Required. Example: 4.8', 'seo-schema-blocks' ) }
					/>
					<TextControl
						label={ __( 'Rating Count', 'seo-schema-blocks' ) }
						value={ ratingCount }
						onChange={ ( value ) => setAttributes( { ratingCount: value } ) }
					/>
					<TextControl
						label={ __( 'Best Rating', 'seo-schema-blocks' ) }
						value={ bestRating }
						onChange={ ( value ) => setAttributes( { bestRating: value } ) }
					/>
					<TextControl
						label={ __( 'Worst Rating', 'seo-schema-blocks' ) }
						value={ worstRating }
						onChange={ ( value ) => setAttributes( { worstRating: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h3 className="gsb-rating-title">{ __( 'SEO Rating Schema', 'seo-schema-blocks' ) }</h3>
				{ ratingValue ? (
					<p>
						{ __( 'Rating schema will be generated:', 'seo-schema-blocks' ) }{' '}
						<strong>{ ratingValue }</strong> / { best }
						{ ratingCount ? (
							<span>
								{ __( ' from ', 'seo-schema-blocks' ) }
								{ ratingCount } { __( 'ratings', 'seo-schema-blocks' ) }
							</span>
						) : null }
						{ __( ' for ', 'seo-schema-blocks' ) }
						{ itemName ? <strong>{ itemName }</strong> : __( 'this page', 'seo-schema-blocks' ) }.
					</p>
				) : (
					<p>{ __( 'Enter at least a rating value to generate schema.', 'seo-schema-blocks' ) }</p>
				) }
				<p className="gsb-rating-note">
					{ __( 'This block outputs AggregateRating JSON-LD only; nothing visual on the front end.', 'seo-schema-blocks' ) }
				</p>
			</div>
		</>
	);
}
