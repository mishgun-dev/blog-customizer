import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	current: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	current,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(current);

	const containerRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);
		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<div className={styles.fieldContainer}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							title='Шрифт'
						/>
					</div>

					<div className={styles.fieldContainer}>
						<RadioGroup
							selected={formState.fontSizeOption}
							name='fontSize'
							options={fontSizeOptions}
							onChange={handleFontSizeChange}
							title='Размер шрифта'
						/>
					</div>

					<div className={styles.fieldContainer}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							title='Цвет шрифта'
						/>
					</div>

					<Separator />

					<div className={styles.fieldContainer}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							title='Цвет фона'
						/>
					</div>

					<div className={styles.fieldContainer}>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
