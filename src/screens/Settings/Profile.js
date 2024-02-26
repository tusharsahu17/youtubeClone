import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {THEME} from '../../utils/colors';
import {Avatar, Button} from '@rneui/themed';
import {DOMAIN_URL} from '../../utils/constants';
import {selectUser} from '../../features/auth/authSlice';
import {useSelector} from 'react-redux';

const Profile = () => {
  const {user} = useSelector(selectUser);
  const {patient} = user;

  const ProfileItem = ({value, icon, ...props}) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.titleContainer}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {patient.image ? (
        <Image
          style={styles.cardImage}
          source={{
            uri: `${DOMAIN_URL}/media/${patient.image}`,
          }}
        />
      ) : (
        <View style={[styles.cardImage]}>
          <Text style={styles.profileText}>
            {patient.user.first_name.slice(0, 2)?.toUpperCase()}
          </Text>
        </View>
      )}
      <ProfileItem
        color={THEME.COLOR_BLACK}
        value={patient.user.first_name + ' ' + patient.user.last_name}
      />
      <ProfileItem color={THEME.COLOR_BLACK} value={patient.dob} />
      <ProfileItem color={THEME.COLOR_BLACK} value={patient.gender} />

      <ProfileItem
        color={THEME.COLOR_BLACK}
        value={patient.user.mobile}
        title={'Mobile No:'}
      />
      <ProfileItem
        color={THEME.COLOR_BLACK}
        value={patient.user.email}
        title={'Email'}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  cardImage: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 100,
    borderColor: THEME.COLOR_BLUE,
    backgroundColor: THEME.THEME_COLOR,
    borderWidth: 5,
    marginVertical: 30,
  },
  profileText: {
    fontSize: 80,
    color: THEME.COLOR_BLUE,
  },
  listContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    borderWidth: 0.51,
    paddingVertical: 10,
    padding: 10,
    textTransform: 'capitalize',
  },
});
