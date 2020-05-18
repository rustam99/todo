<template>
	<div class="preview">
		<div class="container">
			<div class="preview__row">
				<div class="preview__col">
					<div class="preview__head">
						<h1 class="preview__title">Группы</h1>
						<router-link
							:to="{name: 'addGroup'}"
							tag="button"
							class="button">
							+
						</router-link>
					</div>
					<group-list :list="groupList"/>
				</div>
				<div class="preview__col">
					<div class="preview__head">
						<h1 class="preview__title">Карточки</h1>
						<router-link
							:to="{name: 'addCard'}"
							tag="button"
							class="button">
							+
						</router-link>
					</div>
					<card-list :list="cardList"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import groupList from '@/components/group_list';
import cardList from '@/components/card_list';

export default {
	name: 'home',
	data() {
		return {
			cardList: [],
			groupList: [],
		};
	},
	created() {
		this.cardList = this.$store.state.cardList;
		this.groupList = this.$store.state.groupList;
	},
	components: {
		groupList,
		cardList,
	},
};
</script>

<style lang="scss">
	.preview {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 50%;
			width: 2px;
			background-color: $black;
		}

		&__head {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__row {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		&__col {
			width: calc(50% - 1px);
			padding: 0 20px;
			box-sizing: border-box;
		}

		&__title {
			text-align: center;
		}

		@include laptop {
			&__col {
				flex-basis: 500px;
				position: relative;

				&:first-child:after {
					content: '';
					position: absolute;
					top: 100%;
					margin-top: 10px;
					left: 0;
					right: 0;
					height: 2px;
					background-color: $black;
				}
			}

			&:after {
				display: none;
			}
		}
	}
</style>
