import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import {USER_PROFILE} from '../../utils/DataKey';
import {THEME} from '../../utils/colors';
import Feather from 'react-native-vector-icons/Feather';
const UserDetailsPage = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const user = USER_PROFILE;

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleSubmit = values => {
    setEditable(false);
  };

  return (
    <View style={[styles.container, {marginTop: editable ? 59 : 0}]}>
      {!editable && (
        <TouchableOpacity onPress={toggleEditable} style={styles.editContainer}>
          <Text style={styles.editBtn}>Edit </Text>
          <Feather
            style={{
              color: THEME.COLOR_BLACK,
              fontSize: 15,
            }}
            name="edit"
          />
        </TouchableOpacity>
      )}
      <Formik
        initialValues={{
          firstName: user.name,
          image: user.image,
          email: user.email,
          phoneNumber: user.mobile,
          gender: user.gender,
        }}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.formContainer}>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              disabled={!editable}>
              <Image source={{uri: values.image}} style={styles.image} />
            </TouchableOpacity>
            <Modal
              visible={showModal}
              transparent={true}
              onRequestClose={() => setShowModal(false)}>
              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Image
                    source={{uri: values.image}}
                    style={styles.modalImage}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.inputStyles}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              editable={editable}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputStyles}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              editable={editable}
            />
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.inputStyles}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              editable={editable}
            />
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.inputStyles}
              onChangeText={handleChange('gender')}
              onBlur={handleBlur('gender')}
              value={values.gender}
              editable={editable}
            />
            {editable && (
              <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UserDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  editContainer: {
    paddingVertical: 20,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    fontWeight: '500',
    color: THEME.COLOR_BLACK,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: THEME.COLOR_BLUE,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: THEME.COLOR_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: THEME.COLOR_BLACK,
  },
  inputStyles: {
    width: '100%',
    height: 40,
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  saveButtonText: {
    color: THEME.COLOR_WHITE,
  },
  saveBtn: {
    marginTop: 20,
    width: '100%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLOR_BLUE,
  },
});
