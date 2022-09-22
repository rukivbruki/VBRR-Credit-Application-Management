<template>
  <el-form
    ref="form"
    label-position="top"
    :model="address"
    label-width="170px"
    style="padding-top: 20px"
  >
    <el-row v-if="isResidenceAddress" style="margin: 0 0 20px 0" :gutter="20">
      <el-checkbox
        v-model="address.checkSame"
        label="Совпадает с адресом регистрации"
      />
    </el-row>

    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Страна">
          <el-select
            v-model="address.country"
            :disabled="disabledValue.country"
            placeholder="Выберете страну"
            class="el-form-input"
          >
            <el-option
              v-for="item in getCountries"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Регион">
          <el-input
            class="el-form-input"
            v-model="address.region"
            :disabled="disabledValue.region"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Район">
          <el-input
            class="el-form-input"
            v-model="address.area"
            :disabled="disabledValue.area"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Город (населенный пункт)">
          <el-input
            class="el-form-input"
            v-model="address.city"
            :disabled="disabledValue.city"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Улица">
          <el-input
            class="el-form-input"
            v-model="address.street"
            :disabled="disabledValue.street"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Дом">
          <el-input
            class="el-form-input"
            v-model="address.house"
            :disabled="disabledValue.house"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Строение">
          <el-input
            class="el-form-input"
            v-model="address.structure"
            :disabled="disabledValue.structure"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Корпус">
          <el-input
            class="el-form-input"
            v-model="address.building"
            :disabled="disabledValue.building"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Квартира">
          <el-input
            class="el-form-input"
            v-model="address.apartment"
            :disabled="disabledValue.apartment"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="Почтовый индекс">
          <el-input
            class="el-form-input"
            v-model="address.postIndex"
            :disabled="disabledValue.postIndex"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item label="ОКАТО">
          <el-input class="el-form-input" v-model="address.okato" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PersonAddressForm',
  props: {
    item: Object,
  },
  data() {
    return {
      address: this.item,
      isResidenceAddress: this.item.addressType === 'ADDRESS.PH.RESIDENCE',
      disabledValue: {
        country: false,
        region: false,
        area: false,
        city: false,
        street: false,
        house: false,
        structure: false,
        building: false,
        apartment: false,
        postIndex: false,
      },
    };
  },
  beforeMount() {
    this.setDisabledValues();
  },
  computed: {
    ...mapGetters(['getCountries']),
  },
  methods: {
    setDisabledValues() {
      for (let key in this.disabledValue) {
        this.disabledValue[key] = !!this.item[key];
      }
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-right: 20px;
}

.el-form-input {
  width: 100%;
}

.person-address-body {
  margin: 0;
}

.person-address-body > div {
  padding: 0;
}

@media screen and (max-width: 720px) {
  .person-address-body {
    flex-direction: column;
  }

  .person-address-body > div {
    max-width: 100%;
  }
}
</style>
